const Task = require('../models/Task');
const asynWarpper = require('../middleware/async')

// SIMPLE SETUP
// const getAllTasks = async (req, res) => {
//     try{
//         const tasks = await Task.find({});              // Mongoose Query: See documentation!!
//         res.status(200).json({tasks:tasks});
//     } catch(error){
//         res.status(500).json({msg: error});
//     }
// }
const createTask = async (req, res) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).json({task});
    }
    catch(error){
        res.status(500).json({msg: error});
    }
}
const getTask = async (req, res) => {
     try{
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task){
            return res.status(404).json({msg: `No task with id :${taskID}`});
        }
        res.status(201).json({task});
    }
    catch(error){
        res.status(500).json({msg: error});
    }
}
const deleteTask = async (req, res) => {
    try{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return res.status(404).json({msg: `No task with id :${taskID}`});
        }
        res.status(200).json({task});
    }
    catch(error){
        res.status(500).json({msg: error});
    }
}
const updateTask = async (req, res) => {
    try{
    const {id:taskID} = req.params;

    const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {               // Mongoose Query: See documentation!!
        new:true,
        runValidators:true
    });
    if(!task){
        return res.status(404).json({msg: `No task with id :${taskID}`});
    }

    res.status(200).json({task})

    } catch(error){
    res.status(500).json({msg: error});
    }
   
}

// MIDDLEWARE SETUP
const getAllTasks = asynWarpper( async (req, res) => {
    const tasks = await Task.find({});              // Mongoose Query: See documentation!!
    res.status(200).json({tasks:tasks});
})

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
};