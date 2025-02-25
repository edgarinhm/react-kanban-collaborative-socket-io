import { Link } from "react-router-dom";

const TaskCard = ({ taskStatus, taskItem }) => {
  return (
    <div className={`${taskStatus}__items`}>
      {taskItem.title}
      <div className="comments__container">
        <Link to={`/comments/${taskItem.id}/${taskStatus}`}>
          <div className="comment">
            {taskItem.comments.length > 0 ? `View Comments` : "Add Comment"}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
