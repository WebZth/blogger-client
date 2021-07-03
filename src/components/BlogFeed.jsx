import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { populateFeed } from "../reducers/postReducer";
import { Jumbotron } from "react-bootstrap";
import BlogPreview from "./BlogPreview";

const BlogFeed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(populateFeed());
  }, [dispatch]);

  return (
    <>
      <h3 className="mb-3">Blog Feed</h3>
      <Jumbotron
        className="p-2"
        style={{ maxHeight: "100vh", overflow: "auto" }}
      >
        {posts.length && posts.map((p) => <BlogPreview key={p.id} post={p} />)}
      </Jumbotron>
    </>
  );
};
export default BlogFeed;
