require("dotenv").config()
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const pool = require('../../config/database')
// const async = require('async')
// const waterfall = require('async/waterfall')

module.exports = {

    insertToken: (email, token, callback) =>{

        tokenExpiry = Date.now() + 3600000 //Adds 1 hour to the current time
        pool.query('update registration set resetToken = ?, tokenExpiry = ? where email = ?', 
        [token, tokenExpiry, email],
        (error, results, fields) => {
            if(error){
                callback(error)
            }
            //console.log(results)
            return callback(null, results.affectedRows)
        });
    },

    sendMail: (email,token, callback) => {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
            },
            tls: {
              rejectUnauthorized: false
            }
          })
          
          let receiverEmail = email
        
          let mailOptions = {
            to: receiverEmail,
            from: process.env.EMAIL,
            subject: "<Tourist>Reset password",
            text: "You are receiving this email because you have clicked on forget password.\n\n"+
            "Click of the below link to reset your password\\n\n"+ 'http://localhost:4200/reset/'+receiverEmail+"/"+token
            
          }
        
          transporter.sendMail(mailOptions, function(error, response){
            if(error){
                //console.log(error)
                callback(error)
            }
            else{
                //console.log("Mail sent: ", response)
                callback(null, response)
            }
          })

    },

    sendPasswordChangedMail: (email, callback) => {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
            },
            tls: {
              rejectUnauthorized: false
            }
          })
          
          let receiverEmail = email
        
          let mailOptions = {
            to: receiverEmail,
            from: process.env.EMAIL,
            subject: "<Tourist>Password change successful",
            text: "Your password has been changed successfully"
          }
        
          transporter.sendMail(mailOptions, function(error, response){
            if(error){
                //console.log(error)
                callback(error)
            }
            else{
                //console.log("Mail sent: ", response)
                callback(null, response)
            }
          })

    },

    checkResetToken: (email, token, callback) => {

        currentTime = Date.now()
        pool.query('select * from registration where email = ? and resetToken = ? and tokenExpiry > ?', 
        [email, token, currentTime],
        (error, results, fields) => {
            if(error){
                callback(error)
            }
            //console.log(results.length)
            return callback(null, results)
        });
    }

}