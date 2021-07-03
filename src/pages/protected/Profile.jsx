import {
  Container,
  Form,
  Card,
  Jumbotron,
  InputGroup,
  FormControl,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { remove } from "../../api/userServices";
import BlogPreview from "../../components/BlogPreview";
import { useField } from "../../hooks/index";
import { removeAuth } from "../../reducers/authReducer";
import { notify } from "../../reducers/notificationReducer";
import { endUserSession, updateSessionUser } from "../../reducers/userReducer";

const Profile = () => {
  let sessionUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const propToRemove = "reset";
  const { [propToRemove]: resetPassword, ...password } = useField("password");
  const { [propToRemove]: resetEmail, ...email } = useField("email");
  const { [propToRemove]: resetName, ...name } = useField("text");
  const { [propToRemove]: resetUsername, ...username } = useField("text");

  const resetAll = () => {
    resetEmail();
    resetPassword();
    resetName();
    resetUsername();
  };
  const updateUserHandler = async (event) => {
    event.preventDefault();

    //conditionally add object properties
    const data = {
      ...(password.value && { password: password.value }),
      ...(email.value && { email: email.value }),
      ...(name.value && { name: name.value }),
      ...(username.value && { username: username.value }),
    };
    try {
      if (!(data.password || data.email)) {
        await dispatch(updateSessionUser(data));
        resetAll();
      } else {
        await dispatch(updateSessionUser(data));
        resetAll();
        dispatch(endUserSession());
        dispatch(removeAuth());
        dispatch(
          notify("Please Login again, password/email changed ", "primary", 5)
        );
        history.push("/");
      }
    } catch ({ error }) {
      dispatch(notify("" + error, "danger", 5));
    }
  };

  // delete user profile
  const deleteUser = async () => {
    const cachedUser = JSON.parse(localStorage.getItem("cachedUser"));
    const {
      token,
      user: { _id: id },
    } = cachedUser;
    try {
      if (window.confirm("Delete your profile?")) {
        await remove(id, token);
        dispatch(endUserSession());
        dispatch(removeAuth());
        dispatch(notify("Profile Deleted successfully", "warning", 5));
        history.push("/");
      }
    } catch ({ error }) {
      dispatch(notify("" + error, "danger", 5));
    }
  };

  return (
    <Container>
      {sessionUser && (
        <>
          <Jumbotron className="p-2">
            <Card text="dark">
              <Card.Header className="mb-0 h2">
                Update Profile Information
              </Card.Header>
              <Card.Body>
                <Form onSubmit={updateUserHandler}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label srOnly>Email</Form.Label>
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>Email</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl {...email} placeholder="Email" />
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Please provide a valid email.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label srOnly>Password</Form.Label>
                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>Password</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl {...password} placeholder="Password" />
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Please include special characters, numbers and capital
                      letters.
                    </Form.Text>
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group controlId="formBasicName">
                        <Form.Label srOnly>Name</Form.Label>
                        <InputGroup className="mb-2">
                          <InputGroup.Prepend>
                            <InputGroup.Text>Name</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl {...name} placeholder="Full Name" />
                        </InputGroup>
                        <Form.Text className="text-muted">
                          Please provide your full name.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formBasicUsername">
                        <Form.Label srOnly>Username</Form.Label>
                        <InputGroup className="mb-2">
                          <InputGroup.Prepend>
                            <InputGroup.Text>@</InputGroup.Text>
                          </InputGroup.Prepend>
                          <FormControl {...username} placeholder="Username" />
                        </InputGroup>
                        <Form.Text className="text-muted">
                          Please provide a username.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="success" type="submit">
                    ⚙️ Update
                  </Button>
                  <Form.Text className="text-muted">
                    Cancel Update <NavLink to="/home">Go Back</NavLink>
                  </Form.Text>
                </Form>
              </Card.Body>
              <Card.Footer>
                <Button variant="outline-danger" onClick={deleteUser}>
                  Delete Profile
                </Button>
              </Card.Footer>
            </Card>
          </Jumbotron>
          <hr />
          <h3>My Posts</h3>
          <Jumbotron
            className="p-2"
            style={{ maxHeight: "80vh", overflow: "auto" }}
          >
            {(sessionUser.posts.length &&
              sessionUser.posts.map((p) => (
                <BlogPreview key={p.id} post={p} />
              ))) || <p>No posts yet! 👻</p>}
          </Jumbotron>
        </>
      )}
    </Container>
  );
};
export default Profile;
