import { useEffect, useState } from "react";
import { GetTasks } from "../../common/services/task-service";
import { TaskStatus } from "../../common/constants/task-status-constants";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import TaskColumn from "./task-column";
import { dragTask } from "../../lib/socket-client";

const TaskGrid = ({ socket }) => {
  const [tasks, setTasks] = useState();

  const colums = Object.values(TaskStatus);

  const handleDragTask = (dropItem) => {
    dragTask(dropItem);
  };

  useEffect(() => {
    const loadTasksData = async () => {
      const tasksData = await GetTasks();
      setTasks(Object.values(tasksData));
    };
    loadTasksData();
  }, []);

  useEffect(() => {
    socket.on("tasks", (tasksData) => setTasks(Object.values(tasksData)));
  }, [socket]);

  if (!tasks) {
    return "Loading tasks...";
  }

  return (
    <div className="container">
      <DndProvider backend={HTML5Backend}>
        {colums.map((column) => (
          <TaskColumn
            key={column}
            title={column}
            tasks={tasks?.filter((task) => task.title === column)[0]}
            onDragItem={handleDragTask}
          />
        ))}
      </DndProvider>
    </div>
  );
};

export default TaskGrid;
