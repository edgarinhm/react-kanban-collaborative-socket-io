export const disconnect = (socket) => {
    socket.disconnect();
};

export const emitCreateTask = (task, socket) => {
    socket.emit("createTask", { task });
};

export const emitDragTask = (dropItem, socket) => {
    socket.emit("taskDragged", dropItem);
};

export const emitRefreshTasks = (task, socket) => {
    socket.emit("refreshTasks", { task });
};

export const emitAddComment = (comment, socket) => {
    socket.emit("addComment", { comment });
};

export const emitFetchComments = (comment, socket) => {
    socket.emit("fetchComments", { comment });
};


export const emitDeleteComment = (comment, socket) => {
    socket.emit("deleteComment", { comment });
};