import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import Project from "./Project/Project";
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
