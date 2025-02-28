const express = require("express");
const { httpStatus } = require("../constants/http-constants");
const taskRouter = express.Router();
const { TaskModel } = require("../models/task-model");

// get task
taskRouter.get("/tasks/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!taskId) {
            const error = "taskId not match";
            return res.status(httpStatus.BAD_REQUEST).json({ message: error });
        }
        const tasks = await TaskModel.find({ taskId }).exec();
        res.json(tasks);
    } catch (error) {
        console.error("get-task-error:", error);
        return res
            .status(error.status || httpStatus.SERVER_ERROR)
            .json({ message: error });
    }
});

// create task
taskRouter.post("/tasks", async (req, res) => {
    try {
        const newTask = {
            title: req.body.title,
            userId: req.body.userId,
            boardId: req.body.boardId,
            commments: [],
            status: "pending",
        };
        const task = await TaskModel.create(newTask);
        res.json(task);
    } catch (error) {
        console.error("post-task-error:", error);
        return res
            .status(error.status || httpStatus.SERVER_ERROR)
            .json({ message: error });
    }
});

// delete task
taskRouter.delete("/tasks/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;

        if (!taskId) {
            const error = "taskId not match";
            return res.status(httpStatus.BAD_REQUEST).json({ message: error });
        }
        const tasks = await TaskModel.findByIdAndDelete(taskId).exec();
        res.json(tasks);
    } catch (error) {
        console.error("delete-task-error:", error);
        return res
            .status(error.status || httpStatus.SERVER_ERROR)
            .json({ message: error });
    }
});

module.exports = taskRouter;
