import { CreateTask } from "../../common/services/task-service";
import { emitCreateTask, disconnect } from "../../lib/socket-client";
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

  return (
    <>
      <Navigation onLogout={handleLogout} />
      <AddTask />
      <TaskGrid />
    </>
  );
};

export default Task;
