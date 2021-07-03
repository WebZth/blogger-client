import { Button, Card, Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Reactions from "./Reactions";
import Comments from "./Comments";
import { populateFeed } from "../reducers/postReducer";
import { useEffect } from "react";

const Blog = () => {
  const dispatch = useDispatch();
  const { id: postId } = useParams();

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(populateFeed());
  }, [dispatch]);

  if (posts.length) {
    const post = posts.find((p) => p.id === postId);
    return (
      <Container>
        <Button className="mb-3" variant="outline-primary" as={Link} to="/home">
          ⬅️ Back
        </Button>
        <Jumbotron className="p-1">
          <Card bg="dark" text="light">
            <Card.Body>
              <Card.Title>{post.postTitle}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                ~ posted by {post.postAuthor || "👻"} on {post.created_at}
              </Card.Subtitle>
              <Card.Text>{post.postContent}</Card.Text>
              <Reactions reactions={post.reactions} post={post} />
              <Card.Text className="text-muted">
                updated last at {post.updated_at || null}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Comments post={post} />
            </Card.Footer>
          </Card>
        </Jumbotron>
      </Container>
    );
  } else {
    return null;
  }
};
export default Blog;
