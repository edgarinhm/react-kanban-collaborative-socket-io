const express = require('express');
const { httpStatus } = require('../constants/http-constants');
const loginRouter = express.Router();
const { UserModel } = require("../models/user-model");
const { KanbanBoardModel } = require('../models/kanban-board-model');


// Autenticar usuario
loginRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username, password }).exec();

        if (!user?.id) {
            const error = "user or password not match";
            return res.status(httpStatus.BAD_REQUEST).json({ message: error });
        }

        const board = await KanbanBoardModel.findOne({ userId: user._id }).exec();

        res.json({
            message: 'Login successful',
            userId: user._id,
            boardId: board._id,
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
        await KanbanBoardModel.create({ title: `board-${username}`, tasks: [], userId: user._id });
        res.json({
            message: 'SignIn successful',
            userId: user._id,
        });
    } catch (error) {
        console.error('postlogin-error:', error);
        return res.status(error.status || httpStatus.SERVER_ERROR).json({ message: error });
    }
});

module.exports = loginRouter;