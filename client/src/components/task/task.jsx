import socketIO from "socket.io-client";
import { SOCKET_CLIENT_URL } from "../../common/constants/environment-constants";
import AddTask from "./add-task";
import Navigation from "./navigation";
import TaskGrid from "./task-grid";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const socket = socketIO.connect(SOCKET_CLIENT_URL);
  const navigate = useNavigate();

  socket.on("connect", () => {
    localStorage.setItem("socketId", socket.id);
  });

  const handleLogout = () => {
    socket.disconnect();
    localStorage.clear();
    navigate("/login");
  };

  const handleCreateTask = (task) => {
    console.log("handleCreateTask", task);
    socket.emit("createTask", { task });
  };

  return (
    <>
      <Navigation onLogout={handleLogout} />
      <AddTask onAddTask={handleCreateTask} />
      <TaskGrid socket={socket} />
    </>
  );
};

export default Task;
