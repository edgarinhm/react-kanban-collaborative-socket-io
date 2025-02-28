import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  emitAddComment,
  emitDeleteComment,
  emitFetchComments,
} from "../../lib/socket-client";
import { SOCKET_CLIENT_URL } from "../../common/constants/environment-constants";
import { io } from "socket.io-client";

const socket = io(SOCKET_CLIENT_URL);

const Comments = () => {
  const { category, id } = useParams();
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const addComment = (event) => {
    event.preventDefault();
    if (!comment) {
      return false;
    }
    emitAddComment(
      {
        text: comment,
        name: localStorage.getItem("username"),
        userId: localStorage.getItem("userId"),
        taskId: id,
      },
      socket
    );
    setComment("");
  };

  const deleteComment = (comment) => {
    emitDeleteComment(comment, socket);
  };

  useEffect(() => {
    emitFetchComments({ taskId: id }, socket);
  }, [category, id]);

  useEffect(() => {
    socket.on("comments", (data) => setCommentList(data));
    return () => {
      socket.off("comments");
    };
  }, []);

  return (
    <div className="comments__container">
      <form
        className="comment__form"
        autoComplete="off"
        noValidate
        onSubmit={addComment}
      >
        <label htmlFor="comment">{"Add a comment"}</label>
        <textarea
          rows={5}
          id={"comment"}
          name={"comment"}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder={"type your comments..."}
          required
        />
        <button className="commentBtn" type="submit">
          {"ADD COMMENT"}
        </button>
      </form>
      <div className="comments__section">
        <h2>{"Existing Comments"}</h2>
        {commentList.map((comment) => (
          <div className="card-header" key={comment._id}>
            <p>
              <span>{comment.text}</span>
              {` by `}
              {comment.name}
            </p>
            <button
              className="card-btn-close"
              onClick={() => deleteComment(comment)}
            >
              {"x"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
