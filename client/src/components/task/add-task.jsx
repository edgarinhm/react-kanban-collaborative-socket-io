import { useState } from "react";

const AddTask = ({ socket }) => {
  const [task, setTask] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    socket.emit("createTask", { task });
    setTask("");
  };

  return (
    <div className="task__add-container">
      <label htmlFor="add-task">{"New task label:"}</label>
      <input
        className="input"
        type="text"
        id="add-task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="add-card-btn" onClick={handleAddTodo}>
        {"Add Card"}
      </button>
    </div>
  );
};

export default AddTask;
