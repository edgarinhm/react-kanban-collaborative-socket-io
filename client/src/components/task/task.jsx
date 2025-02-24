import socketIO from "socket.io-client";
import { SOCKET_CLIENT_URL } from "../../common/constants/environment-constants";
import AddTask from "./add-task";
import Navigation from "./navigation";
import TaskGrid from "./task-grid";

const socket = socketIO.connect(SOCKET_CLIENT_URL);
const Task = () => {
  return (
    <>
      <Navigation />
      <AddTask socket={socket} />
      <TaskGrid socket={socket} />
    </>
  );
};

export default Task;
