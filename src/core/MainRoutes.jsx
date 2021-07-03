import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import NavMenu from "./NavMenu";
import ProtectedRoute from "../components/ProtectedRoute";
import Notification from "../components/Notification";
import Footer from "./../components/Footer";
import Blog from "../components/Blog";
// public
import Landing from "../pages/public/Landing";
import Login from "../pages/public/Login";
import Signup from "../pages/public/Signup";
// protected
import Home from "../pages/protected/Home";
import Profile from "../pages/protected/Profile";

const MainRoutes = () => {
  // check notification state and display
  const notification = useSelector((state) => state.notification);

  return (
    <>
      <NavMenu />
      {notification && <Notification notification={notification} />}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <ProtectedRoute path="/home" component={Home} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/posts/:id" component={Blog} />
      </Switch>
      <Footer />
    </>
  );
};

export default MainRoutes;
