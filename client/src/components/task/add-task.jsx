import { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [task, setTask] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (!task) {
      return false;
    }
    onAddTask(task);
    setTask("");
  };

  return (
    <form autoComplete="off" noValidate className="add-task-container">
      <label htmlFor="add-task">{"New task:"}</label>
      <input
        className="input"
        type="text"
        id="add-task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="add-card-btn" onClick={handleAddTodo}>
        {"Add Card"}
      </button>
    </form>
  );
};

export default AddTask;
