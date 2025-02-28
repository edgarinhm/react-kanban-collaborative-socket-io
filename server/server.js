
const { tasks } = require("./data/tasks");
const { fetchID } = require("./functions/fetch-functions");
const { TaskModel } = require("./models/task-model");

const startSocketServer = ({ socketIO }) => {

    socketIO.on('connection', (socket) => {
        console.log(`${socket.id} User connected!`);

        socket.on("taskDragged", async (data) => {
            const updateTask = async () => {
                await TaskModel.findByIdAndUpdate(data.task._id, { status: data.newStatus }).exec();
            }
            await updateTask();
        });

        socket.on('disconnect', () => {
            socket.disconnect()
            console.log(' User disconnected');
        });

        socket.on("createTask", async (data) => {
            const getTasks = async () => {
                return await TaskModel.find({ boardId: data.task.boardId }).exec();
            }
            const tasks = await getTasks();
            socket.emit("tasks", tasks);
        });

        socket.on("addComment", (data) => {
            const { category, userId, comment, id } = data;
            const taskItems = tasks[category].items;

            for (const element of taskItems) {
                if (element.id === id) {
                    element.comments.push({
                        name: userId,
                        text: comment,
                        id: fetchID(),
                    });
                    socket.emit("comments", element.comments);
                }
            }
        });

        socket.on("fetchComments", (data) => {
            const { category, id } = data;
            const taskItems = tasks[category].items;
            for (const element of taskItems) {
                if (element.id === id) {
                    socket.emit("comments", element.comments);
                }
            }
        });


        socket.on("refreshTasks", async (data) => {
            const getTasks = async () => {
                return await TaskModel.find({ boardId: data.task.boardId }).exec();
            }
            const tasks = await getTasks();

            console.log('refreshTasks', tasks);

            socket.emit("tasks", tasks);
        });
    });
}

module.exports = { startSocketServer };
