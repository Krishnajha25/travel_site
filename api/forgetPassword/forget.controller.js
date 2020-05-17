const { getUserByUserEmail } = require('../users/user.service')
const { insertToken } = require('./forget.service')
const async = require('async')
const waterfall = require('async/waterfall')


module.exports = {

    checkEmail: (req, res) => {
        const email = req.params.email
        getUserByUserEmail(email, (err, results) => {
            if(err){
                res.status(200).json({
                    success: 0,
                    message: "Some error occured",
                    Error: err
                })
            }
            if(!results){
                return res.status(200).json({
                    success: 0,
                    message: "No email found"
                })
            }
            //return res.status(200).json({
            insertToken(email, (err, results) => {
                if(err){
                    console.log(err)
                }
                else{
                    console.log(results)
                }
            })
            //})
        })
    },

    sendEmail: (req,res) => {
        const data = req.body
        sendMail(data, (error, response) => {
            if(error){
                return res.status(200).json({
                    succes: 0,
                    message: "Error occured",
                    Error: error
                })
            }
            return res.status(200).json({
                success: 1,
                message: "Mail Sent",
                response: response
            })
        })
    }


}