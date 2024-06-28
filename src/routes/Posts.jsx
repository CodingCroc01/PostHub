import { Outlet } from "react-router-dom";

import PostsList from "../components/PostsList";

function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Posts;

export async function loader() {
  const response = await fetch(
    "https://react-learning-http-7612a-default-rtdb.firebaseio.com/posts.json"
  );
  const resData = await response.json();

  const loadedPosts = [];

  for (const key in resData) {
    const postObj = {
      id: key,
      ...resData[key],
    };

    loadedPosts.push(postObj);
  }
  return loadedPosts;
}
