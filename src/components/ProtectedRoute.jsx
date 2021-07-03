import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth === true ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
