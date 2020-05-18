const {
    sendMail
} = require('./contact.service')

const { getUserByUserEmail } = require('../users/user.service')

module.exports = {

    contactController: (req, res) => {

        const data = req.body
        //console.log(data)
        getUserByUserEmail(data.email, (err, response) => {
            if(err){
                return res.status(200).json({
                    success: 0,
                    message: "Error occured",
                    Error: err
                })
            }
            if(!response){
                return res.status(200).json({
                    success: 0,
                    message: "Sorry the email is not registered with us. Please use the resgistered email"
                })
            }

            sendMail(data, (error, response) => {
                if(error){
                    return res.status(200).json({
                        success: 0,
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

        })

    }
}