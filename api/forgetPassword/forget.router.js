const { checkEmail } = require('./forget.controller')
const forgetRouter = require('express').Router()
const async = require('async')
const waterfall = require('async/waterfall')


forgetRouter.get('/:email', checkEmail)


module.exports = forgetRouter
