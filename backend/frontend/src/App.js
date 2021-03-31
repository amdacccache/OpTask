import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import Project from "./Project/Project";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";
import Profile from "./Profile/Profile";
import UpdateProfile from "./Update_Profile/UpdateProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useEffect, useRef } from "react";

function App() {
  let loggedIn = useRef(null);
  useEffect(() => {
    async function fetchData() {
      loggedIn.current = await fetch("/auth/isLoggedIn", { method: "GET" });
    }
    fetchData();
  });

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/profile/update">
          <UpdateProfile />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route exact path="/projects/:projectId">
          <Project />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
