const express = require('express')
const { addTaks, getAllTask, findSingleTask, updateTask, deleteTask, markAsDone } = require('../controller/task')
const taskRouter = express.Router()

taskRouter.get('/getAllTask/:id', getAllTask)

taskRouter.get('/getSingleTask/:userId/:taskId', findSingleTask)

taskRouter.post('/addTask/:id', addTaks)

taskRouter.put('/updateTask/:userId/:taskId', updateTask)

taskRouter.put('/markAsDone/:userId/:taskId', markAsDone)

taskRouter.delete('/deleteTask/:userId/:taskId', deleteTask)

module.exports = taskRouter