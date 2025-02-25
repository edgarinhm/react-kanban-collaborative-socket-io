import { Link } from "react-router-dom";

const TaskCard = ({ taskStatus, taskItem }) => {
  return (
    <div className={`${taskStatus}__items`}>
      {taskItem.title}
      <Link to={`/comments/${taskItem.id}/${taskStatus}`}>
        <div className="comment">
          {taskItem.comments.length > 0 ? `View Comments` : "Add Comment"}
        </div>
      </Link>
    </div>
  );
};

export default TaskCard;
