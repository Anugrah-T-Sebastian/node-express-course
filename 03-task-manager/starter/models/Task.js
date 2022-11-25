const mongoose = require('mongoose');

// Schema creation: simple
// const TaskSchema = new mongoose.Schema({
//     name: String,
//     completed: Boolean
// })

// Schema creation & validation

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'must provide name'],        // [boolen requirement, custom error message]
        trim: true,
        maxlength: [20, 'name can not be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false,
    },
})




module.exports = mongoose.model('Task', TaskSchema);