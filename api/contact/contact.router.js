const contactRouter = require("express").Router()
const{ checkToken } = require('../../auth/token_validation')
const { contactController } = require('./contact.controller')

contactRouter.post("/", checkToken, contactController)

module.exports = contactRouter