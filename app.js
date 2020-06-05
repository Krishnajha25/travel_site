require("dotenv").config();
const express = require("express");
const nodemailer = require('nodemailer')
const app = express();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
//const pool = require('./config/database')
const { getUserByUserEmail, updateUserPassword, removeToken } = require('./api/users/user.service')
const { insertToken, sendMail, checkResetToken, sendPasswordChangedMail } = require('./api/forgetPassword/forget.service')
const crypto = require('crypto')

//User defined routers
const userRouter = require("./api/users/user.router");
const commentRouter = require('./api/comment/comment.router');
const contactRouter = require('./api/contact/contact.router');
const forgetRouter = require('./api/forgetPassword/forget.router');

var path = require('path')
var cors = require("cors")
var bodyParser = require("body-parser")
const { checkToken } = require('./auth/token_validation')

const xlsxFile = require("read-excel-file/node")

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.get('/api/file', (req, res) => {
  xlsxFile('./RECORD.xlsx').then((rows) => 
    {
      res.json(rows)
    }
  )
})

app.get('/api/file/:name', (req, res) => {
  const name = req.params.name
  xlsxFile('./RECORD.xlsx').then((rows) => 
    {
      for (let i = 0; i < rows.length; i++) {
        if(rows[i][0] === name){
          return res.json(rows[i])
        }
      }
    }
  )
})


app.use(express.static(path.join(__dirname, 'public')))

app.use("/api/users", userRouter);    //User router

app.use("/api/comment", commentRouter);   //Comment Router

app.use("/api/contact", contactRouter)  //Contact router

//app.use("/api/forgetPassword", forgetRouter)   //Forget Password Router



app.post('/api/forgot', function(req, res){
  
  var token = crypto.randomBytes(20).toString('hex');

  const email = req.body.email

  getUserByUserEmail(email, (err, result) => {
    if(err){
      return res.status(200).json({
        success: 0,
        message: "Error occured",
        Error: err
      })
    }
    if(!result){
      return res.status(200).json({
        success: 0,
        message: "Sorry! This email is not registered with us."
      })
    }

    insertToken(email, token, (err, result) => {
      if(err){
        return res.status(200).json({
          success: 0,
          message: "Error occured",
          Error: err
        })
      }
      if(result < 1){
        return res.status(200).json({
          success: 0,
          message: "Sorry! This email is not registered with us."
        })
      }

      sendMail(email, token, (err, result) => {
        if(err){
          return res.status(200).json({
            success: 0,
            message: "Error occured",
            Error: err
          })
        }
        if(!result){
          return res.status(200).json({
            success: 0,
            message: "Sorry! This email is not registered with us.",
            Error: err
          })
        }
        return res.status(200).json({
          success: 1,
          message: "Password reset link has been sent to your email id",
          //Result: result
        })
      })

    })
    
  })
  
})

app.get('/api/reset/:email/:token', (req, res) => {

  email = req.params.email
  token = req.params.token

  checkResetToken(email, token, (err, result) => {
    if(err){
      return res.json({
        success: 0,
        message: "Some error occured",
        Error: err
      })
    }
    if(result < 1){
      return res.json({
        success: 0,
        messgae: "Sorry the link is expired. Please retry!"
      })
    }
    
    return res.json({
      success: 1,
      message: 'Please enter your new password below'
    })
  })

  //console.log(email+" "+token)
})


//Reset post req

app.post('/api/reset/:email/:token', (req, res) => {

  email = req.params.email
  token = req.params.token

  password = req.body.password
  confirmPassword = req.body.confirm_password

  const salt = genSaltSync(10);
  hashPassword = hashSync(password, salt);

  checkResetToken(email, token, (err, result) => {
    if(err){
      return res.json({
        success: 0,
        message: "Some error occured",
        Error: err
      })
    }
    if(result < 1){
      return res.json({
        success: 0,
        message: "Token expired"
      })
    }

    if(password !== confirmPassword){
      return res.json({
        success: 0,
        message: "Password do not match"
      })
    }
        
    updateUserPassword(email, hashPassword, (err, result) => {
      if(err){
        return res.json({
          success: 0,
          message: "Some error occured",
          Error: err
        })
      }
      if(result < 1){
        return res.json({
          success: 0,
          message: "Could not update password"
        })
      }
      // return res.json({
      //   success: 1,
      //   message: "Password updated successfully"
      // })

      sendPasswordChangedMail(email, (err, result) => {
        if(err){
          return res.status(200).json({
            success: 0,
            message: "Error occured",
            Error: err
          })
        }
        if(!result){
          return res.status(200).json({
            success: 0,
            message: "Email could not be sent",
            Error: err
          })
        }
        
        removeToken(email, (error, result) => {
          if(error){
            return res.status(200).json({
              success: 0,
              message: 'Some error occured',
              Error: error
            })
          }
          if(result < 1){
            return res.status(200).json({
              success: 0,
              message: 'Could not reset token'
            })
          }
          return res.status(200).json({
            success: 1,
            message: "Your password has been changed successully."
          })
        })
      })                  

    })
    
  })

  //console.log(email+" "+token)
})

  

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
