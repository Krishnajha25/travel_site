require("dotenv").config()
const nodemailer = require('nodemailer')

module.exports = {

    sendMail: (data, callback) => {

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
          
          let senderName = data.name
          let senderEmail = data.email
          let senderMessage = data.message
        
          let mailOptions = {
            to: process.env.EMAIL,
            from: senderEmail,
            subject: "Query raised on website",
            //text: senderMessage,
            replyTo: senderEmail,
            html: "<h3>Received from "+ senderName +"</h3><br><p>"+ senderMessage +"</p>"
          }
        
        //   if(senderEmail === ""){
        //     return callback("No sender email")
        //   }
        
        //   if(senderName === ""){
        //     res.status(400).send({
        //       message: "Bad request"
        //     })
        //     return
        //   }
        
        //   if(senderMessage === ""){
        //     res.status(400).send({
        //       message: "Bad request"
        //     })
        //     return
        //   }
        
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

    }

}