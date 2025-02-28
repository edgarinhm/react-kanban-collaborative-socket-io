import { useEffect, useState } from "react";
import { GetBoardTasks } from "../../common/services/task-service";
import { TaskStatus } from "../../common/constants/task-status-constants";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import TaskColumn from "./task-column";

const TaskGrid = ({ socket }) => {
  const [tasks, setTasks] = useState();
  const [isLoading, setIsLoading] = useState();

  const colums = Object.values(TaskStatus);
  const boardId = localStorage.getItem("boardId");

  useEffect(() => {
    const loadTasksData = async () => {
      setIsLoading(true);
      try {
        const tasksData = await GetBoardTasks(boardId);
        setTasks(tasksData);
      } catch (error) {
        error && console.error("error");
      } finally {
        setIsLoading(false);
      }
    };
    loadTasksData();
  }, [boardId]);

  useEffect(() => {
    socket.on("tasks", (tasksData) => setTasks(tasksData));
    return () => {
      socket.off("tasks");
    };
  }, [socket]);

  return (
    <>
      <div className="container">
        <DndProvider backend={HTML5Backend}>
          {colums.map((column) => (
            <TaskColumn
              key={column}
              title={column}
              tasks={tasks?.filter((task) => task.status === column)}
              socket={socket}
            />
          ))}
        </DndProvider>
      </div>
      {isLoading && <div>{"Loading tasks..."}</div>}
    </>
  );
};

export default TaskGrid;
