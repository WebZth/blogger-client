import { useEffect } from "react";
import {
  Container,
  Jumbotron,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, giveAuth } from "../../reducers/authReducer";
import { useField } from "./../../hooks/index";
import { notify } from "../../reducers/notificationReducer";
import { setSessionUser } from "../../reducers/userReducer";

const Login = () => {
  // dispatch redux action for auth
  const dispatch = useDispatch();
  // react-router redirecting
  const { state } = useLocation();
  const history = useHistory();

  // check for cachedUser
  useEffect(() => {
    if (localStorage.getItem("cachedUser")) {
      const { user } = JSON.parse(localStorage.getItem("cachedUser"));
      // give auth
      dispatch(giveAuth());
      dispatch(notify(`Welcome back ${user.name}`, "success", 5));
      dispatch(setSessionUser());
      history.push(`${state?.from.pathname || "/home"}`);
    }
  }, [dispatch, history, state?.from.pathname]);

  // form state
  const propToRemove = "reset";
  const { [propToRemove]: resetEmail, ...email } = useField("email");
  const { [propToRemove]: resetPassword, ...password } = useField("password");

  const resetAll = () => {
    resetEmail();
    resetPassword();
  };

  // form login
  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {
      email: email.value,
      password: password.value,
    };
    try {
      // attempt login
      await dispatch(getAuth(credentials));
      resetAll();
      dispatch(setSessionUser());
      dispatch(notify("Welcome back", "success", 5));
      history.push(`${state?.from.pathname || "/home"}`);
    } catch (error) {
      dispatch(notify("" + error, "danger", 5));
    }
  };

  return (
    <Container>
      <Jumbotron>
        <Card>
          <Card.Header className="mb-0 h2">Login to your account</Card.Header>
          <Card.Body>
            <Form onSubmit={handleLogin}>
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

              <Button variant="success" type="submit">
                Log In
              </Button>
              <Form.Text className="text-muted">
                Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
              </Form.Text>
            </Form>
          </Card.Body>
        </Card>
      </Jumbotron>
    </Container>
  );
};
export default Login;
