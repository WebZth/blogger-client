import { useEffect } from "react";
import { giveAuth } from "../../reducers/authReducer";
import { notify } from "../../reducers/notificationReducer";
import { Container, Jumbotron, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSessionUser } from "../../reducers/userReducer";

const Landing = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth);

  // check for cachedUser
  useEffect(() => {
    if (localStorage.getItem("cachedUser")) {
      const { user } = JSON.parse(localStorage.getItem("cachedUser"));
      // give auth
      dispatch(giveAuth());
      dispatch(setSessionUser());
      dispatch(notify(`Welcome back ${user.name}`, "success", 5));
    }
  }, [dispatch]);

  return (
    <Container>
      <Jumbotron>
        <h1>Welcome to 🅱️logger</h1>
        <hr />
        <p>
          This is a fullstack blog application, written in modern javascript
          using modern work-flows like redux, redux-thunk and react-bootstrap.
          This React front-end is communicating with a back-end node application
          written in Express. Check out my source-code{" "}
          <a
            href="https://github.com/WebZth/BLOGAPP-MERN"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
        <br />
        {!isAuth && (
          <>
            <p>
              <Button as={NavLink} to="/signup" variant="outline-primary">
                Sign Up
              </Button>
            </p>
            <p className="text-muted">
              Already have an account? <NavLink to="/login">Log In</NavLink>
            </p>
          </>
        )}
        {isAuth && (
          <>
            <p>
              <Button as={NavLink} to="/home" variant="success">
                Home
              </Button>
            </p>
            <p className="text-muted">You are already signed in</p>
          </>
        )}
      </Jumbotron>
    </Container>
  );
};

export default Landing;
