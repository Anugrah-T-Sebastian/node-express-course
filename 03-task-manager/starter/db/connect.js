// Username: anugrah Password: Anugrah1998

const mongoose = require('mongoose')

const connectDB = (url) => {
    // returning promise
return mongoose
    .connect(url, {
        useNewUrlParser:true,
        useCreateIndex: true,
        useFindAndModify:false,
        useUnifiedTopology:true,
    })
}

module.exports = connectDB;