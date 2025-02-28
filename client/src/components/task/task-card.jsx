import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";

const TaskCard = ({ taskStatus, taskItem, onDelete }) => {
  const commentsCount = taskItem.comments.length;
  const commentLabel = commentsCount > 1 ? "Comments" : "Comment";

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: taskItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`${taskStatus}__items`}>
      <div className="card-header">
        <span>{taskItem.title}</span>
        <button className="card-btn-close" onClick={onDelete}>
          {"x"}
        </button>
      </div>
      <Link to={`/comments/${taskItem._id}/${taskStatus}`}>
        <div className="comment">
          {commentsCount > 0
            ? `${commentsCount} ${commentLabel}`
            : "Add Comment"}
        </div>
      </Link>
    </div>
  );
};

export default TaskCard;
