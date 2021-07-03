import { Button, Card, Jumbotron } from "react-bootstrap";
import Reactions from "./Reactions";
import { Link } from "react-router-dom";

const BlogPreview = ({ post }) => {
  const {
    postTitle,
    postAuthor,
    created_at,
    postContent,
    reactions,
    comments,
    id,
  } = post;
  return (
    <Jumbotron className="p-0 mb-2">
      <Card bg="dark" text="light">
        <Card.Body>
          <Card.Title>{postTitle}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            ~ {postAuthor || "👻"} on {created_at}
          </Card.Subtitle>
          <Card.Text>
            {postContent.slice(0, 15)}...{" "}
            <Button variant="outline-info" as={Link} to={`/posts/${id}`}>
              Read More
            </Button>
          </Card.Text>
          <Card.Text className="text-muted">
            {comments.length} comments
          </Card.Text>
          <Reactions reactions={reactions} post={post} />
        </Card.Body>
      </Card>
    </Jumbotron>
  );
};
export default BlogPreview;
