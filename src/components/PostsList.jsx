import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Post from "./Post";
import classes from "./PostsList.module.css";
import { useEffect, useState } from "react";

function PostsList() {
  const loadedPosts = useLoaderData();
  const [posts, setPosts] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    setDeleted(true);
  };

  useEffect(() => {
    setPosts(loadedPosts);
  }, [loadedPosts]);

  useEffect(() => {
    if (deleted) {
      const updateDatabase = async () => {
        try {
          const postsObject = {};
          posts.forEach((post) => {
            postsObject[post.id] = post;
          });

          console.log("Updating database with posts:", postsObject);
          await fetch(
            "https://react-learning-http-7612a-default-rtdb.firebaseio.com/posts.json",
            {
              method: "PUT",
              body: JSON.stringify(postsObject),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          navigate("/");
        } catch (error) {
          console.error("Failed to update the database", error);
        } finally {
          setDeleted(false);
        }
      };

      if (posts.length !== 0) {
        updateDatabase();
      }
    }
  }, [deleted, posts, navigate]);

  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              body={post.body}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
