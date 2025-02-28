import { io } from "socket.io-client";
import { SOCKET_CLIENT_URL } from "../../common/constants/environment-constants";
import AddTask from "./add-task";
import Navigation from "./navigation";
import TaskGrid from "./task-grid";
import { useNavigate } from "react-router-dom";
import { disconnect } from "../../lib/socket-client";

const Task = () => {
  const socket = io(SOCKET_CLIENT_URL);
  const navigate = useNavigate();

  const handleLogout = () => {
    disconnect(socket);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navigation onLogout={handleLogout} />
      <AddTask socket={socket} />
      <TaskGrid socket={socket} />
    </>
  );
};

export default Task;
