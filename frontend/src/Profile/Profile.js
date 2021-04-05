import Navbar from "../Navbar/Navbar";
import "./Profile.css";
import { useEffect, useRef, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import IconImage from "../Images/userIcon.png";
import Footer from "../Footer/Footer.js";
import { toast } from "react-toastify";
import ProjectCard from "../Dashboard/ProjectCard";

function Profile() {
  let loggedIn = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userData, setUserData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [userProjects, setProjectsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setIsDataLoading(true);
      const result = await fetch("/auth/isLoggedIn", { method: "GET" });
      const parsedResult = await result.json();
      loggedIn.current = parsedResult.isLoggedIn;
      setLoggedInUser(parsedResult.user);
      setLoggedIn(loggedIn.current);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      if (loggedInUser._id) {
        const userDataResult = await fetch(`/userData/${loggedInUser._id}`, {
          method: "GET",
        });
        const parsedUserDataResult = await userDataResult.json();
        setUserData(parsedUserDataResult);
        setIsDataLoading(false);
      }
    }
    fetchUserData();
  }, [loggedInUser._id]);

  useEffect(() => {
    async function fetchProjectData() {
      if (loggedInUser) {
        const dataResult = await fetch(
          `/projects/${loggedInUser._id}/profile`,
          {
            method: "GET",
          }
        );
        const parsedProjectsData = await dataResult.json();
        setProjectsData(parsedProjectsData);
      } else {
        toast.error("Please sign in!");
      }
    }
    fetchProjectData();
  }, [loggedInUser]);

  if (isLoggedIn) {
    return (
      <div className="profile-cont">
        <Navbar />
        <nav
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/dashboard">
                  <span data-feather="home"></span>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="profile">
                  <span data-feather="file"></span>
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="profile-container">
            <div className="main-body">
              {isDataLoading && (
                <div className="container">
                  <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={500}
                    width={500}
                  />{" "}
                </div>
              )}
              {!isDataLoading && (
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="profile-card">
                      <div className="p-card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <img
                            src={IconImage}
                            alt="Admin"
                            className="rounded-circle"
                            width="120"
                          />
                          <h4 class="card-title mb-0">{userData.fullname}</h4>
                          <div className="mt-3">
                            <Link
                              className="btn btn-primary"
                              to="/profile/update"
                            >
                              Edit Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="profile-card mb-3">
                      <div className="p-card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Full Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {userData.fullname}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Job</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {userData.job}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Institution</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {userData.institution}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {userData.username}
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Location</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {userData.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 class="mt-4" style={{color: "#2947f2"}}>Most Recent Projects</h3>
                </div>
              )}
              <div className="row row-cols-1 row-cols-md-2 g-4 mb-3">
                {!isDataLoading && userProjects.map((project) => {
                  return (
                    <Link
                      key={project._id}
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2947f2" fill-opacity="1" d="M0,0L48,5.3C96,11,192,21,288,69.3C384,117,480,203,576,208C672,213,768,139,864,133.3C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

export default Profile;
