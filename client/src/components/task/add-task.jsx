import { useState } from "react";

const AddTask = ({ socket }) => {
  const [task, setTask] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    socket.emit("createTask", { task });
    setTask("");
  };

  return (
    <div>
      <label htmlFor="add-task">Add Task</label>
      <input
        className="input"
        type="text"
        id="add-task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="addCardBtn" onClick={handleAddTodo}>
        Add Card
      </button>
    </div>
  );
};

export default AddTask;
