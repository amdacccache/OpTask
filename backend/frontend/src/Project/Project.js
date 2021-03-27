import Navbar from "../Navbar/Navbar";
import TaskForm from "./TaskForm";
import "./Project.css";
import { Redirect, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Project = (props) => {
  let loggedIn = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  //const [loggedInUser, setLoggedInUser] = useState({});
  const [projectData, setProjectData] = useState({});
  const [tasksData, setTasksData] = useState([]);
  //const [displayTaskForm, setDisplayTaskForm] = useState(false);
  let { projectId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("/auth/isLoggedIn", { method: "GET" });
      const parsedResult = await result.json();
      loggedIn.current = parsedResult.isLoggedIn;
      // uncomment this code for validation implementation
      //setLoggedInUser(parsedResult.user);
      setLoggedIn(loggedIn.current);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchProject() {
      const result = await fetch(`/projects/projectData/${projectId}`);
      const parsedResult = await result.json();
      setProjectData(parsedResult);
    }

    async function fetchTasks() {
      const result = await fetch(`/projects/${projectId}/tasks`);
      const parsedResult = await result.json();
      setTasksData(parsedResult);
    }
    fetchProject();
    fetchTasks();
  }, [projectId]);

  if (isLoggedIn) {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <div className="row">
            <nav
              id="sidebarMenu"
              className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            >
              <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      href="/dashboard"
                    >
                      <span data-feather="home"></span>
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/profilePage">
                      <span data-feather="file"></span>
                      Profile
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
                <h1 className="h2">Project: {projectData.projectName}</h1>
              </div>
              <div className="row">
                <div className="container taskContainer col-4 border border-dark">
                  <h2>To-Do</h2>
                  <TaskForm projectId={projectId} />
                  {tasksData.map((task) => {
                    //TODO create cards for tasks
                    return <div key={task._id}>{task.taskText}</div>;
                  })}
                </div>
                <div className="container taskContainer col-4 border border-dark">
                  <h2> In-Progress</h2>
                </div>
                <div className="container taskContainer col-4 border border-dark">
                  <h2>Done</h2>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default Project;
