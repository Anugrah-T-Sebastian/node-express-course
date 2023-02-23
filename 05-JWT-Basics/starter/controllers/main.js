const { CustomAPIError, BadRequest, UnauthenticatedError } = require('../errors/index');
const jwt = require('jsonwebtoken');


const login = async (req, res) => {
    const { username, password } = req.body;
    // mongoose validation
    // joi
    if (!username || !password) {
        throw new BadRequest('Please provide email and password')
    }
    //just for demo, normally ID is provided by the DB
    const id = new Date().getDate()
    //try to keep payload small, better experience for user
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(200).json({ msg: 'user created', token });
}

const dashboard = async (req, res) => {
    console.log("User coming from Middleware", req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your authorised data, your lucky number is ${luckyNumber}` });
}

module.exports = {
    login, dashboard
}