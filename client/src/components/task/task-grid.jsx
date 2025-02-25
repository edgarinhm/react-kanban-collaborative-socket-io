import { useEffect, useState } from "react";
import { GetTasks } from "../../common/services/task-service";
import TaskCard from "./task-card";

const TaskGrid = ({ socket }) => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const loadTasksData = async () => {
      const tasksData = await GetTasks();
      setTasks(tasksData);
    };
    loadTasksData();
  }, []);

  useEffect(() => {
    socket.on("tasks", (data) => setTasks(data));
  }, [socket]);

  return (
    <div className="container">
      {Object.values(tasks).map((task) => (
        <div key={task.title} className={`${task.title}__wrapper`}>
          <h3
            className={`head ${task.title}__head`}
          >{`${task.title} Tasks`}</h3>
          <div className={`card-container ${task.title}__container`}>
            {task.items?.map((item) => (
              <TaskCard key={item.id} taskStatus={task.title} taskItem={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskGrid;
