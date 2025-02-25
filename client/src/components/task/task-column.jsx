import { useDrop } from "react-dnd";
import TaskCard from "./task-card";

const TaskColumn = ({ title, tasks, socket }) => {
  const [, drop] = useDrop({
    accept: "task",
    drop: (item) => {
      const { status, ...task } = item;
      socket.emit("taskDragged", {
        task,
        status: status,
        newStatus: title,
      });
    },
  });

  return (
    <div ref={drop} className={`${title}__wrapper`}>
      <h3 className={`head ${title}__head`}>{`${title} Tasks`}</h3>
      <div className={`card-container ${title}__container`}>
        {tasks.items.map((item) => (
          <TaskCard key={item.id} taskStatus={title} taskItem={item} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
