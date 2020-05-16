const contactRouter = require("express").Router()
const{ checkToken } = require('../../auth/token_validation')
const { sendMail } = require('./contact.controller')

contactRouter.post("/", checkToken, sendMail)

module.exports = contactRouter