import {
  Container,
  Jumbotron,
  Card,
  Form,
  FormControl,
  Button,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { create } from "../../api/userServices";
import { useField } from "./../../hooks/index";
import { notify } from "../../reducers/notificationReducer";
import { useEffect } from "react";
import { giveAuth } from "../../reducers/authReducer";
import { setSessionUser } from "../../reducers/userReducer";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // check for cachedUser
  useEffect(() => {
    if (localStorage.getItem("cachedUser")) {
      const { user } = JSON.parse(localStorage.getItem("cachedUser"));
      // give auth
      dispatch(giveAuth());
      dispatch(notify(`Welcome back ${user.name}`, "success", 5));
      dispatch(setSessionUser());
      history.push("/");
    }
  }, [dispatch, history]);

  const propToRemove = "reset";
  const { [propToRemove]: resetEmail, ...email } = useField("email");
  const { [propToRemove]: resetPassword, ...password } = useField("password");
  const { [propToRemove]: resetUsername, ...username } = useField("text");
  const { [propToRemove]: resetName, ...name } = useField("text");

  const resetAll = () => {
    resetEmail();
    resetPassword();
    resetName();
    resetUsername();
  };

  // form signup
  const handleSignup = async (event) => {
    event.preventDefault();
    const user = {
      email: email.value,
      password: password.value,
      username: username.value,
      name: name.value,
    };
    try {
      await create(user);
      resetAll();
      dispatch(notify("Sign Up successful, login to continue", "success", 5));
      history.push("/login");
    } catch ({ error }) {
      dispatch(notify("" + error, "danger", 5));
    }
  };

  return (
    <Container>
      <Jumbotron>
        <Card>
          <Card.Header className="mb-0 h2">Create an account</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSignup}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label srOnly>Email</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Email</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl {...email} placeholder="Email" required />
                </InputGroup>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label srOnly>Password</Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Password</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl {...password} placeholder="Password" required />
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
                      <FormControl {...name} placeholder="Full Name" required />
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
                      <FormControl
                        {...username}
                        placeholder="Username"
                        required
                      />
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Please provide a username.
                    </Form.Text>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit">
                Sign Up
              </Button>
              <Form.Text className="text-muted">
                Already have an account? <NavLink to="/login">Log In</NavLink>
              </Form.Text>
            </Form>
          </Card.Body>
        </Card>
      </Jumbotron>
    </Container>
  );
};
export default Signup;
