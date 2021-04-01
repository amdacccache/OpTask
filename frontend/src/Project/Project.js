import Navbar from "../Navbar/Navbar";
import TaskForm from "./TaskForm";
import Task from "./Task";
import "./Project.css";
import { Redirect, useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";

const Project = (props) => {
  let loggedIn = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  //const [loggedInUser, setLoggedInUser] = useState({});
  const [projectData, setProjectData] = useState({});
  const [tasksData, setTasksData] = useState([]);
  //const [displayTaskForm, setDisplayTaskForm] = useState(false);
  let { projectId } = useParams();
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("/auth/isLoggedIn", { method: "GET" });
      const parsedResult = await result.json();
      loggedIn.current = parsedResult.isLoggedIn;
      // uncomment this code for validation implementation
      //setLoggedInUser(parsedResult.user);
      setLoggedIn(loggedIn.current);
      setIsDataLoading(true);
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
      setIsDataLoading(false);
    }
    fetchProject();
    fetchTasks();
  }, [projectId]);

  const refreshTasks = async function () {
    console.log("calling refresh of the tasks");
    const result = await fetch(`/projects/${projectId}/tasks`);
    const parsedResult = await result.json();
    setTasksData(parsedResult);
  };

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
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/dashboard"
                    >
                      <span data-feather="home"></span>
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <span data-feather="file"></span>
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
                {isDataLoading && (
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                  />
                )}
                <h1 className="h2">Project: {projectData.projectName}</h1>
              </div>
              <div className="row">
                <div className="container taskContainer col-4 border border-danger rounded">
                  <h2>To-Do</h2>
                  <TaskForm projectId={projectId} newTaskAdded={refreshTasks} />
                  {isDataLoading && (
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={100}
                      width={100}
                    />
                  )}
                  {tasksData.length ? (
                    tasksData
                      .filter((task) => {
                        return task.taskState === "todo";
                      })
                      .map((task) => {
                        return (
                          <Task
                            key={task._id}
                            task={task}
                            taskUpdated={refreshTasks}
                          />
                        );
                      })
                  ) : (
                    <h4 className="m-3">No tasks yet!</h4>
                  )}
                </div>
                <div className="container taskContainer col-4 border border-warning rounded">
                  <h2> In-Progress</h2>
                  {isDataLoading && (
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={100}
                      width={100}
                    />
                  )}
                  {tasksData
                    .filter((task) => {
                      return task.taskState === "inprogress";
                    })
                    .map((task) => {
                      //TODO create cards for tasks
                      return (
                        <Task
                          key={task._id}
                          task={task}
                          taskUpdated={refreshTasks}
                        />
                      );
                    })}
                </div>
                <div className="container taskContainer col-4 border border-success rounded">
                  <h2>Done</h2>
                  {isDataLoading && (
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={100}
                      width={100}
                    />
                  )}
                  {tasksData
                    .filter((task) => {
                      return task.taskState === "done";
                    })
                    .map((task) => {
                      //TODO create cards for tasks
                      return (
                        <Task
                          key={task._id}
                          task={task}
                          taskUpdated={refreshTasks}
                        />
                      );
                    })}
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
