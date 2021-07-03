import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Jumbotron,
  Button,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useField } from "./../../hooks/index";
import BlogFeed from "../../components/BlogFeed";
import { addPost } from "../../reducers/postReducer";
import { notify } from "./../../reducers/notificationReducer";

const Home = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.user);

  const propToRemove = "reset";
  const { [propToRemove]: resetTitle, ...title } = useField("text");
  const { [propToRemove]: resetContent, ...content } = useField("text");

  const resetAll = () => {
    resetTitle();
    resetContent();
  };

  const postHandler = async (event) => {
    event.preventDefault();
    const post = {
      postTitle: title.value,
      postContent: content.value,
      postAuthor: sessionUser.username,
    };
    try {
      await dispatch(addPost(post));
      sessionUser.posts.length++;
      resetAll();
    } catch (error) {
      dispatch(notify("" + error, "danger", 5));
    }
  };

  return (
    <Container>
      {sessionUser && (
        <Row>
          <Col xs={12} sm={12} md={4} className="xs-sm mb-3">
            <Card>
              <Card.Header>🔐 My Profile</Card.Header>
              <Card.Body>
                <Card.Title>{sessionUser.name}</Card.Title>
                <Card.Text className="text-muted">
                  {sessionUser.name} joined 🅱️logger on {sessionUser.created_at}
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  🎉 {sessionUser.posts.length} posts shared
                </ListGroupItem>
                <ListGroupItem>📬 {sessionUser.email}</ListGroupItem>
                <ListGroupItem>
                  🗣️ {sessionUser.updated_at || "no updates"}
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link as={NavLink} to="/profile">
                  ⚙️ Settings
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Jumbotron className="p-2">
              <Card>
                <Card.Header className="mb-0 h4">Create Blog</Card.Header>
                <Card.Body>
                  <Form onSubmit={postHandler}>
                    <Form.Group controlId="formBasicTitle">
                      <Form.Label srOnly>Title</Form.Label>
                      <InputGroup className="mb-2">
                        <InputGroup.Prepend>
                          <InputGroup.Text>Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                          {...title}
                          placeholder="Blog Title"
                          required
                        />
                      </InputGroup>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        {...content}
                        placeholder="What's on your mind..."
                        as="textarea"
                        rows={2}
                      />
                      <Form.Text className="text-muted">
                        Please refrain from profanity and keep other people's
                        feelings in mind when sharing posts.
                      </Form.Text>
                    </Form.Group>

                    <Button variant="success" type="submit">
                      🅱️log
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Jumbotron>
            <hr />
            <BlogFeed />
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default Home;
