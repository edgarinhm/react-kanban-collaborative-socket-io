const express = require('express');
const { httpStatus } = require('../constants/http-constants');
const loginRouter = express.Router();
const { UserModel } = require("../models/user-model");


// Autenticar usuario
loginRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username, password }).
            exec();

        if (!user?.id) {
            throw Error('user or password not match');
        }
        res.json({
            message: 'Login successful',
            userId: user._id
        });
    } catch (error) {
        console.error('getlogin-error:', error);
        return res.status(error.status || httpStatus.SERVER_ERROR).json({ message: error });
    }
});

// Registrar usuario
loginRouter.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.create({ username, password });
        res.json({
            message: 'SignIn successful',
            userId: user._id
        });
    } catch (error) {
        console.error('postlogin-error:', error);
        return res.status(error.status || httpStatus.SERVER_ERROR).json({ message: error });
    }
});

module.exports = loginRouter;