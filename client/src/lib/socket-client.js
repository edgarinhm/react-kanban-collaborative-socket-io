import { io } from "socket.io-client";
import { SOCKET_CLIENT_URL } from "../common/constants/environment-constants";

export const socket = io(SOCKET_CLIENT_URL)

socket.on("connect", () => {
    localStorage.setItem("socketId", socket.id);
});

export const disconnect = () => {
    socket.disconnect();
};

export const createTask = (task) => {
    socket.emit("createTask", { task });
};

export const dragTask = (dropItem) => {
    socket.emit("taskDragged", dropItem);
};