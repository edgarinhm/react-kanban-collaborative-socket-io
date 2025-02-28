import { useDrop } from "react-dnd";
import TaskCard from "./task-card";
import { DeleteTask } from "../../common/services/task-service";
import { emitDragTask, emitRefreshTasks } from "../../lib/socket-client";

const TaskColumn = ({ title, tasks, socket }) => {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => {
      emitDragTask(
        {
          task: item,
          newStatus: title,
        },
        socket
      );
    },
  });
  const handleDeleteTask = async (task) => {
    await DeleteTask(task._id);
    emitRefreshTasks(task, socket);
  };

  return (
    <div ref={drop} className={`${title}__wrapper`}>
      <h3 className={`head ${title}__head`}>{`${title} Tasks`}</h3>
      <div className={`card-container ${title}__container`}>
        {tasks?.map((item) => (
          <TaskCard
            key={item._id}
            taskStatus={title}
            taskItem={item}
            onDelete={() => handleDeleteTask(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
