const Task = require('../models/Task');

const getAllTasks = (req, res) => {
    res.status(200).send('all items from file')
}
const createTask = async (req, res) => {
    try{
        const task = await Task.create(req.body);
        res.status(201).json({task});
    }
    catch(error){
        res.status(500).json({msg: error});
    }
}
const getTask = (req, res) => {
    res.status(200).json({id:req.params.id});
}
const updateTask = (req, res) => {
    res.status(200).send('update task')
}
const deleteTask = (req, res) => {
    res.status(200).send('delete task')
}

module.exports = {
    getAllTasks, createTask, getTask, updateTask, deleteTask
};