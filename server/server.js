const { CommentModel } = require("./models/comment-model");
const { TaskModel } = require("./models/task-model");

const startSocketServer = ({ socketIO }) => {

    socketIO.on('connection', (socket) => {
        console.log(`${socket.id} User connected!`);

        socket.on("taskDragged", async (data) => {
            const updateTask = async () => {
                await TaskModel.findByIdAndUpdate(data.task._id, { status: data.newStatus }).exec();
            }
            await updateTask();
            const tasks = await TaskModel.find({ boardId: data.task.boardId }).exec();
            socket.emit("tasks", tasks);
        });

        socket.on('disconnect', () => {
            socket.disconnect();
            console.log(' User disconnected');
        });

        socket.on("createTask", async (data) => {
            const getTasks = async () => {
                return await TaskModel.find({ boardId: data.task.boardId }).exec();
            }
            const tasks = await getTasks();
            socket.emit("tasks", tasks);
        });

        socket.on("addComment", async (data) => {
            const newComment = { text: data.comment.text, name: data.comment.name, userId: data.comment.userId, taskId: data.comment.taskId };
            await CommentModel.create(newComment);
            const comments = await CommentModel.find({ taskId: data.comment.taskId }).exec();
            socket.emit("comments", comments);
        });

        socket.on("fetchComments", async (data) => {
            const comments = await CommentModel.find({ taskId: data.comment.taskId }).exec();
            socket.emit("comments", comments);
        });

        socket.on("refreshTasks", async (data) => {
            const tasks = await TaskModel.find({ boardId: data.task.boardId }).exec();
            socket.emit("tasks", tasks);
        });
    });
}

module.exports = { startSocketServer };
