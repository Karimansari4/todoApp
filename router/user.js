const express = require('express')
const { registerUser, singIn } = require('../controller/userLogin')
const userRouter = express.Router()

userRouter.post('/register', registerUser)

userRouter.post('/singin', singIn)

module.exports = userRouter