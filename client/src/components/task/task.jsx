import socketIO from "socket.io-client";
import { SOCKET_CLIENT_URL } from "../../common/constants/environment-constants";
import AddTask from "./add-task";
import Navigation from "./navigation";

const socket = socketIO.connect(SOCKET_CLIENT_URL);
const Task = () => {
  return (
    <div>
      <Navigation />
      <AddTask socket={socket} />
    </div>
  );
};

export default Task;
