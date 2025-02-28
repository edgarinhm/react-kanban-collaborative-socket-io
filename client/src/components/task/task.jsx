import { createTask, disconnect, socket } from "../../lib/socket-client";
import AddTask from "./add-task";
import Navigation from "./navigation";
import TaskGrid from "./task-grid";
import { useNavigate } from "react-router-dom";

const Task = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    disconnect();
    localStorage.clear();
    navigate("/login");
  };

  const handleCreateTask = (task) => {
    console.log("handleCreateTask", task);
    createTask();
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
