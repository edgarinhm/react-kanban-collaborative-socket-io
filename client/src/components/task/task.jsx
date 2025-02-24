import socketIO from "socket.io-client";
import { SOCKET_CLIENT_URL } from "../../common/constants/environment-constants";
import AddTask from "./add-task";
import Navigation from "./navigation";
import TaskCard from "./task-card";

const socket = socketIO.connect(SOCKET_CLIENT_URL);
const Task = () => {
  return (
    <div>
      <Navigation />
      <AddTask socket={socket} />
      <TaskCard />
    </div>
  );
};

export default Task;
