const {
    sendMail
} = require('./contact.service')

module.exports = {

    sendMail: (req, res) => {
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