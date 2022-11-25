const getAllTasks = (req, res) => {
    res.status(200).send('all items from file')
}
const createTask = (req, res) => {
    res.status(200).json(req.body);
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