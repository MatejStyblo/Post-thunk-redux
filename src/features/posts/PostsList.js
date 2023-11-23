import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostsExcerpt from "./PostsExcerpt";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice";
const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);
  const keyPost = posts.slice();
  let content;
  if (postStatus === "loading") {
    content = <p>"Loading...</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => <PostsExcerpt post={post} />);
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <section key={keyPost.id}>
      <h2>Posts</h2>
      {content}
    </section>
  );
};
export default PostsList;
