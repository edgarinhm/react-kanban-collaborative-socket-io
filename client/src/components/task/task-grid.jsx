import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetTasks } from "../../common/services/task-service";

const TaskGrid = ({ socket }) => {
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const loadTasksData = async () => {
      const tasksData = await GetTasks();
      setTasks(tasksData);
    };
    loadTasksData();
  }, []);

  return (
    <div>
      {Object.entries(tasks).map((task) => (
        <div key={task[1].title}>
          <h6>{`${task[1].title} Tasks`}</h6>
          {task[1].items?.map((item) => (
            <div key={item.id}>
              {item.title}
              <Link to={"/comments"}>
                {item.comments.length > 0 ? `View Comments` : "Add Comment"}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskGrid;
