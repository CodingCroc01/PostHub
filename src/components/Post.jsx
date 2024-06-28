import { Link } from "react-router-dom";

import classes from "./Post.module.css";

function Post({ id, author, body, onDelete }) {
  const handleDeleteButton = () => {
    onDelete(id);
  };
  return (
    <>
      <li className={classes.post}>
        <Link to={id}>
          <p className={classes.author}>{author}</p>
          <p className={classes.text}>{body}</p>
        </Link>
        <button onClick={handleDeleteButton} className={classes.btn}>
          Delete Post
        </button>
      </li>
    </>
  );
}

export default Post;
