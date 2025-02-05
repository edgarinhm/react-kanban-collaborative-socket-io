
const { tasks } = require("./data/tasks");

const startSocketServer = ({ socketIO }) => {

    socketIO.on('connection', (socket) => {
        console.log(`${socket.id} User connected!`);

        socket.on("taskDragged", (data) => {
            console.log(data);
        });

        socket.on('disconnect', () => {
            socket.disconnect()
            console.log(' User disconnected');
        });

        socket.on("createTask", (data) => {
            const newTask = { id: fetchID(), title: data.task, comments: [] };
            tasks["pending"].items.push(newTask);
            socket.emit("tasks", tasks);
        });

        socket.on("addComment", (data) => {
            const { category, userId, comment, id } = data;

            const taskItems = tasks[category].items;

            for (let i = 0; i < taskItems.length; i++) {
                if (taskItems[i].id === id) {
                    taskItems[i].comments.push({
                        name: userId,
                        text: comment,
                        id: fetchID(),
                    });

                    socket.emit("comments", taskItems[i].comments);
                }
            }
        });
    });
}

module.exports = { startSocketServer };
