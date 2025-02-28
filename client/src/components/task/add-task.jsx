import { useState } from "react";
import { CreateTask } from "../../common/services/task-service";
import { emitCreateTask } from "../../lib/socket-client";

const AddTask = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const userId = localStorage.getItem("userId");
  const boardId = localStorage.getItem("boardId");

  const handleAddTodo = async (event) => {
    event.preventDefault();
    if (!taskTitle) {
      return false;
    }
    const newTask = { title: taskTitle, boardId, userId };
    await CreateTask(newTask);
    emitCreateTask(newTask);
    setTaskTitle("");
  };

  return (
    <form autoComplete="off" noValidate className="add-task-container">
      <label htmlFor="add-task">{"New task:"}</label>
      <input
        className="input"
        type="text"
        id="add-task"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button className="add-card-btn" onClick={handleAddTodo}>
        {"Add Card"}
      </button>
    </form>
  );
};

export default AddTask;
