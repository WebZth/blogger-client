import { Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAuth, removeAuth } from "../reducers/authReducer";
import { notify } from "../reducers/notificationReducer";
import { useField } from "../hooks";
import { endUserSession, setSessionUser } from "../reducers/userReducer";

const NavMenu = () => {
  const isAuth = useSelector((state) => state.auth);
  const history = useHistory();

  // dispatch redux actions
  const dispatch = useDispatch();

  // form state
  const propToRemove = "reset";
  const { [propToRemove]: resetEmail, ...email } = useField("email");
  const { [propToRemove]: resetPassword, ...password } = useField("password");
  const resetAll = () => {
    resetEmail();
    resetPassword();
  };

  // nav login form
  const navLoginHandler = async (event) => {
    event.preventDefault();
    const credentials = {
      email: email.value,
      password: password.value,
    };
    try {
      await dispatch(getAuth(credentials));
      dispatch(setSessionUser());
      dispatch(notify("Welcome back", "success", 5));
      resetAll();
      history.push("/home");
    } catch (error) {
      dispatch(notify("" + error, "danger", 5));
    }
  };

  // logout handler for auth user
  const handleLogout = () => {
    dispatch(endUserSession());
    dispatch(removeAuth());
    dispatch(notify("Logout Successful, See Ya 👋", "warning", 5));
    history.push("/");
  };

  return (
    <Navbar
      sticky="top"
      bg="light"
      variant="light"
      expand="lg"
      className="mb-3"
    >
      <Navbar.Brand as={NavLink} to="/">
        <p className="mb-0 h1">🅱️</p>
      </Navbar.Brand>
      {!isAuth && (
        <Nav.Item>
          <Form inline onSubmit={navLoginHandler}>
            <FormControl
              {...email}
              placeholder="Enter Email"
              className="mr-sm-2"
            />
            <FormControl
              {...password}
              placeholder="Password"
              className="mr-sm-2"
            />
            <Button type="submit" variant="outline-success">
              Log In
            </Button>
          </Form>
        </Nav.Item>
      )}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {!isAuth && (
          <Nav className="ml-auto">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/signup">
                <Button variant="outline-primary">Sign Up</Button>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
        {isAuth && (
          <Nav className="ml-auto">
            <Nav.Item>
              <Button onClick={handleLogout} variant="outline-danger">
                Log Out
              </Button>
            </Nav.Item>
          </Nav>
        )}
        {isAuth && (
          <Nav className="ml-auto">
            <Nav.Item className="mr-2 p-1">
              <Button as={NavLink} to="/home" variant="outline-primary">
                Home
              </Button>
            </Nav.Item>
            <Nav.Item className="p-1">
              <Button as={NavLink} to="/profile" variant="outline-primary">
                Profile
              </Button>
            </Nav.Item>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavMenu;
