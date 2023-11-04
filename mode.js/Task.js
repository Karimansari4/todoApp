const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        default: 'medium'
    }
}, {timestamps: true})

const Task = mongoose.model('task', TaskSchema)
module.exports = Task