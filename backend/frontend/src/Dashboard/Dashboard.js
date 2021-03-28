import Navbar from "../Navbar/Navbar";
import ProjectCard from "./ProjectCard";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
function Dashboard() {
  let loggedIn = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userProjects, setProjectsData] = useState([]);

  const newProjectSubmit = async (event) => {
    event.preventDefault();
    var formData = new FormData(document.querySelector("#newProjectForm"));
    const projectName = formData.get("projectName");
    const projectDescription = formData.get("projectDescription");

    const result = await fetch("/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        projectName: projectName,
        projectDescription: projectDescription,
        ownerId: loggedInUser._id,
      }),
    });
    if (result) {
      document.querySelector("#closeModalButton").click();
      const dataResult = await fetch(`/projects/${loggedInUser._id}`, {
        method: "GET",
      });
      const parsedProjectsData = await dataResult.json();
      setProjectsData(parsedProjectsData);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("/auth/isLoggedIn", { method: "GET" });
      const parsedResult = await result.json();
      loggedIn.current = parsedResult.isLoggedIn;
      setLoggedInUser(parsedResult.user);
      setLoggedIn(loggedIn.current);
    }
    fetchData();
    var newProjectModal = document.getElementById("newProjectModal");
    newProjectModal.addEventListener("show.bs.modal", function (event) {
      // Button that triggered the modal
      //var button = event.relatedTarget;
      // Extract info from data-bs-* attributes
      // var recipient = button.getAttribute("data-bs-whatever");
      // If necessary, you could initiate an AJAX request here
      // and then do the updating in a callback.
      //
      // Update the modal's content.
      var modalTitle = newProjectModal.querySelector(".modal-title");
      //var modalBodyInput = exampleModal.querySelector(".modal-body input");

      modalTitle.textContent = "New Project";
      //modalBodyInput.value = recipient;
    });
  }, []);

  useEffect(() => {
    async function fetchProjectData() {
      const dataResult = await fetch(`/projects/${loggedInUser._id}`, {
        method: "GET",
      });
      const parsedProjectsData = await dataResult.json();
      setProjectsData(parsedProjectsData);
    }
    fetchProjectData();
  }, [loggedInUser._id]);

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
                      className="nav-link active"
                      aria-current="page"
                      href="/dashboard"
                    >
                      <span data-feather="home"></span>
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/profile">
                      <span data-feather="file"></span>
                      Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn nav-link"
                      data-bs-toggle="modal"
                      data-bs-target="#newProjectModal"
                      data-bs-whatever="@mdo"
                    >
                      <span data-feather="bar-chart-2"></span>
                      Create a new project
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            {/* start of new project modal setup */}
            <div
              className="modal fade"
              id="newProjectModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      New Project
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form id="newProjectForm" onSubmit={newProjectSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Project Name:
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="projectName"
                          name="projectName"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="message-text"
                          className="col-form-label"
                        >
                          Project Description:
                        </label>
                        <textarea
                          className="form-control"
                          id="projectDescription"
                          name="projectDescription"
                          required
                        ></textarea>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                          id="closeModalButton"
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          Create Project
                        </button>
                      </div>
                    </form>
                    <div className="modal-footer">
                      <p>Project names cannot be changed yet.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
              </div>
              <div class="row row-cols-1 row-cols-md-2 g-4">
                {userProjects.map((project) => {
                  return (
                    <Link
                      className="projectLink"
                      to={"/projects/" + project._id}
                    >
                      <ProjectCard
                        key={project._id}
                        name={project.projectName}
                        description={project.projectDescription}
                      />
                    </Link>
                  );
                })}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

export default Dashboard;
