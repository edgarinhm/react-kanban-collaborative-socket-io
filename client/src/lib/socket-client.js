import { io } from "socket.io-client";
import { SOCKET_CLIENT_URL } from "../common/constants/environment-constants";

export const socket = io(SOCKET_CLIENT_URL)

socket.on("connect", () => {
    localStorage.setItem("socketId", socket.id);
});

export const disconnect = () => {
    socket.disconnect();
};

export const emitCreateTask = (task) => {
    socket.emit("createTask", { task });
};

export const emitDragTask = (dropItem) => {
    socket.emit("taskDragged", dropItem);
};

export const emitRefreshTasks = (task) => {
    socket.emit("refreshTasks", { task });
};

export const emitAddComment = (comment) => {
    socket.emit("addComment", { comment });
};

export const emitFetchComments = (comment) => {
    socket.emit("fetchComments", { comment });
};