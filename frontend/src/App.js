import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import Project from "./Project/Project";
import SearchResultsPage from "./SearchResults/SearchResultsPage";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import Profile from "./Profile/Profile";
import UpdateProfile from "./Profile/UpdateProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Landing from "./LandingPage/Landing";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  let [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const result = await fetch("/auth/isLoggedIn", { method: "GET" });
      const parsedResult = await result.json();
      setLoggedIn(parsedResult.isLoggedIn);
    }
    fetchData();
  });

  const logoutPressed = () => {
    setLoggedIn(false);
  };

  const loginPressed = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login loginPressed={loginPressed} />
        </Route>
        <Route exact path="/dashboard">
          {loggedIn ? (
            <Dashboard logoutPressed={logoutPressed} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/profile/update">
          <UpdateProfile />
        </Route>
        <Route exact path="/projects/:projectId">
          <Project />
        </Route>
        <Route exact path="/search/:query">
          {({ location }) => {
            return <SearchResultsPage location={location.pathname} />;
          }}
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Landing />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
