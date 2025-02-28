const express = require("express");
const { httpStatus } = require("../constants/http-constants");
const { KanbanBoardModel } = require("../models/kanban-board-model");
const { TaskModel } = require("../models/task-model");
const { CommentModel } = require("../models/comment-model");
const boardRouter = express.Router();

// get board
boardRouter.get("/board/:boardId", async (req, res) => {
    try {
        const { boardId } = req.params;

        if (!boardId) {
            const error = "board not match";
            return res.status(httpStatus.BAD_REQUEST).json({ message: error });
        }
        const board = await KanbanBoardModel.find({ boardId }).exec();
        res.json(board);
    } catch (error) {
        console.error("get-board-error:", error);
        return res
            .status(error.status || httpStatus.SERVER_ERROR)
            .json({ message: error });
    }
});

// create board
boardRouter.post("/board", async (req, res) => {
    try {
        const newBoard = {
            title: req.body.title,
            userId: req.body.userId,
        };
        const board = await KanbanBoardModel.create(newBoard);
        res.json(board);
    } catch (error) {
        console.error("post-board-error:", error);
        return res
            .status(error.status || httpStatus.SERVER_ERROR)
            .json({ message: error });
    }
});

// get board tasks
boardRouter.get("/board/:boardId/tasks", async (req, res) => {
    try {
        const { boardId } = req.params;

        if (!boardId) {
            const error = "board not match";
            return res.status(httpStatus.BAD_REQUEST).json({ message: error });
        }
        const boardTasks = await TaskModel.find({ boardId }).exec();
        const taskPromises = boardTasks.map((task) => {
            const comments = CommentModel.find({ taskId: task._id }).exec();
            return { ...task._doc, comments }
        });
        const tasksWithComments = await Promise.all(taskPromises);
        res.json(tasksWithComments);
    } catch (error) {
        console.error("get-board-tasks-error:", error);
        return res
            .status(error.status || httpStatus.SERVER_ERROR)
            .json({ message: error });
    }
});

module.exports = boardRouter;
