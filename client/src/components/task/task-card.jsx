import { Link } from "react-router-dom";

const TaskCard = ({ taskStatus, taskItem }) => {
  const commentsCount = taskItem.comments.length;
  const commentLabel = commentsCount > 1 ? "Comments" : "Comment";
  return (
    <div className={`${taskStatus}__items`}>
      {taskItem.title}
      <Link to={`/comments/${taskItem.id}/${taskStatus}`}>
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
