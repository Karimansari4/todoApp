const Task = require("../mode.js/Task")

exports.getAllTask = async(req, res) => {
    const id = req.params.id
    // console.log("===================================================================");
    // console.log("id: ", id);
    try {
        if(!id){
            return res.status(400).json({msg: 'Access Denied!', success: false})
        }else{
            const result = await Task.find({userId: id})
            if(result){
                return res.status(200).json({msg: 'Ok', result, success: true})
            }else{
                return res.status(404).json({msg: 'No Task Found?', success: false})
            }
        }
    } catch (error) {
        console.log("error on getAllTask: ", error);
        return res.status(500).json({msg: error.message, error, success: false})
    }
}

exports.findSingleTask = async(req, res) => {
    const {userId, taskId} = req.params

    try {
        if(!userId){
            return res.status(400).json({msg: 'Access Denied!', success: false})
        }else{
            const checkTask = await Task.find({userId: userId})
            if(checkTask){
                const result = await Task.findOne({_id: taskId})
                if(result){
                    return res.status(200).json({msg: 'Ok', result, success: true})
                }else{
                    return res.status(404).json({msg: 'No Task Found?', success: false})
                }
            }else{
                return res.status(404).json({msg: 'No task fond?', success: false})
            }
        }
    } catch (error) {
        console.log("error on findSingleTask: ", error);
        return res.status(500).json({msg: error.message, error, success: false})
    }
}

exports.addTaks = async(req, res) => {
    const id = req.params.id
    const name = req.body.name
    const dueDate = req.body.dueDate
    const priority = req.body.priority

    // console.log("req.body: ", req.body);
    // console.log("req.params: ", req.params);
    try {
        if(!id) {
            return res.status(400).json({msg: 'Access Denied!', success: false})
        }else{
            if(!name){
                return res.status(400).json({msg: 'Please enter task name?', success: false})
            }else if(!dueDate){
                return res.status(400).json({msg: 'Please enter task due date?', success: false})
            }else if(!priority){
                return res.status(400).json({msg: 'Please enter task priority?', success: false})
            }else{
                const checkTask = await Task.findOne({name: name})
                if(checkTask){
                    return res.status(400).json({msg: `Task ${name} is already added`, success: false})
                }else{
                    const result = await Task.create({name: name, dueDate: dueDate, priority: priority, userId: id})
                    if(result){
                        return res.status(200).json({msg: `Task ${name} added successfully.`, success: true})
                    }else{
                        return res.status(400).json({msg: `Failed to add task ${name}?`})
                    }
                }
            }
        }
    } catch (error) {
        console.log("error on addTasks: ", error);
        return res.status(500).json({msg: error.message, error, success: false})
    }
}

exports.updateTask = async(req, res) => {
    const name = req.body.name
    const dueDate = req.body.dueDate
    const priority = req.body.priority
    try {
        if(!userId){
            return res.status(400).json({msg: 'Access Denied!', success: false})
        }else{
            if(!name){
                return res.status(400).json({msg: 'Please enter task name?', success: false})
            }else if(!dueDate){
                return res.status(400).json({msg: 'Please enter task due date?', success: false})
            }else if(!priority){
                return res.status(400).json({msg: 'Please enter task priority?', success: false})
            }else{
                const checkTask = await Task.find({userId: userId})
                if(checkTask){
                    const result = await Task.findByIdAndUpdate({_id: taskId}, {name: name, dueDate: dueDate, priority: priority})
                    if(result){
                        return res.status(200).json({msg: 'Ok', result, success: true})
                    }else{
                        return res.status(404).json({msg: 'No Task Found?', success: false})
                    }
                }else{
                    return res.status(404).json({msg: 'No task fond?', success: false})
                }

            }
        }
    } catch (error) {
        console.log("error on updateTask: ", error);
        return res.status(500).json({msg: error.message, error, success: false})
    }
}

exports.markAsDone = async(req, res) => {
    const {userId, taskId} = req.params
    try {
        if(!userId){
            return res.status(400).json({msg: 'Access Denied!', success: false})
        }else{
            const checkTask = await Task.find({userId: userId})
            if(checkTask){
                const result = await Task.findOneAndUpdate({_id: taskId}, {completed: true})
                if(result){
                    return res.status(200).json({msg: `Task ${result.name} completed successfully.`, result, success: true})
                }else{
                    return res.status(404).json({msg: 'No Task Found?', success: false})
                }
            }else{
                return res.status(404).json({msg: 'No task fond! Please check once', success: false})
            }
        }
    } catch (error) {
        console.log("error on markAsDone: ", error);
        return res.status(500).json({msg: error.message, error, success: false})
    }
}

exports.deleteTask = async(req, res) => {
    const {userId, taskId} = req.params
    try {
        if(!userId){
            return res.status(400).json({msg: 'Access Denied!', success: false})
        }else{
            const checkTask = await Task.find({userId: userId})
            if(checkTask){
                const result = await Task.deleteOne({_id: taskId})
                if(result){
                    return res.status(200).json({msg: `Task delete successfully`, result, success: true})
                }else{
                    return res.status(404).json({msg: 'No Task Found?', success: false})
                }
            }else{
                return res.status(404).json({msg: 'No task fond! Please check once', success: false})
            }
        }
    } catch (error) {
        console.log("error on deleteTask: ", error);
        return res.status(500).json({msg: error.message, error, success: false})
    }
}