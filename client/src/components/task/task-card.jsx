import { Link } from "react-router-dom";

const TaskCard = ({ taskStatus, taskItem }) => {
  return (
    <div className={`${taskStatus}__items`}>
      {taskItem.title}
      <Link to={"/comments"}>
        {taskItem.comments.length > 0 ? `View Comments` : "Add Comment"}
      </Link>
    </div>
  );
};

export default TaskCard;
