import Navbar from "../Navbar/Navbar";
import TaskForm from "./TaskForm";
import Task from "./Task";
import "./Project.css";
import { Redirect, useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";

const Project = () => {
  let loggedIn = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  //const [loggedInUser, setLoggedInUser] = useState({});
  const [projectData, setProjectData] = useState({});
  const [tasksData, setTasksData] = useState([]);
  //const [displayTaskForm, setDisplayTaskForm] = useState(false);
  let { projectId } = useParams();
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [editFormValue, setEditFormValue] = useState("");
  const [projectDeleted, setProjectDeleted] = useState(false);

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
      if (!projectDeleted) {
        const result = await fetch(`/projects/projectData/${projectId}`);
        const parsedResult = await result.json();
        setProjectData(parsedResult);
        setEditFormValue(parsedResult.projectName);
      }
    }

    async function fetchTasks() {
      if (!projectDeleted) {
        const result = await fetch(`/projects/${projectId}/tasks`);
        const parsedResult = await result.json();
        setTasksData(parsedResult);
        setIsDataLoading(false);
      }
    }
    fetchProject();
    fetchTasks();
  }, [projectId, projectDeleted]);

  const refreshTasks = async function () {
    console.log("calling refresh of the tasks");
    const result = await fetch(`/projects/${projectId}/tasks`);
    const parsedResult = await result.json();
    setTasksData(parsedResult);
  };

  const editFormOnChange = (event) => {
    setEditFormValue(event.target.value);
  };

  const updateProject = async () => {
    const result = await fetch(`/projects/updateProject/${projectId}`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newName: editFormValue,
      }),
    });
    const parsedResult = await result.json();
    if (parsedResult.updated) {
      toast.success("Successfully updated project");
      document.querySelector("#closeUpdateModalButton").click();
      setProjectData({ ...projectData, projectName: editFormValue });
    } else {
      toast.error("Couldn't update project. Please try again.");
    }
  };

  const deleteProject = async () => {
    const result = await fetch(`/projects/deleteProject/${projectId}`, {
      method: "POST",
    });
    const parsedResult = await result.json();
    if (parsedResult.deleted) {
      setProjectDeleted(true);
      toast.error("Successfully deleted the project");
      console.log(projectDeleted);
    } else {
      toast.error("Couldn't delete the project. Please try again.");
    }
  };

  if (isLoggedIn && !projectDeleted) {
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
                <div className="row w-100">
                  <div className="col-10">
                    <h1 className="h2">
                      Project:<strong> {projectData.projectName}</strong>
                    </h1>
                  </div>
                  <div className="col-1">
                    <button
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#editProjectModal"
                    >
                      {/* update button */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                      </svg>
                    </button>
                    <button className="btn" onClick={deleteProject}>
                      {/* delete button */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="m-3 shadow-lg border rounded-3 container taskContainer">
                    <h2 className="mt-2">To-Do</h2>
                    <TaskForm
                      projectId={projectId}
                      newTaskAdded={refreshTasks}
                    />
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
                </div>
                <div className=" col-4">
                  <div className="m-3 shadow-lg border rounded-3 container taskContainer">
                    <h2 className="mt-2"> In-Progress</h2>
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
                <div className=" col-4">
                  <div className="m-3 shadow-lg border rounded-3 container taskContainer">
                    <h2 className="mt-2">Done</h2>
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
              </div>
            </main>
          </div>
          <div
            className="modal fade"
            id="editProjectModal"
            tabIndex="-1"
            aria-labelledby="editProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editProjectModalLabel">
                    Edit Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="project-name" className="col-form-label">
                        Project Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="project-name"
                        value={editFormValue}
                        onChange={editFormOnChange}
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    id="closeUpdateModalButton"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={updateProject}
                  >
                    Edit project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (!isLoggedIn) {
    return <Redirect to="/login" />;
  } else if (projectDeleted) {
    return <Redirect to="/dashboard" />;
  }
};

export default Project;
