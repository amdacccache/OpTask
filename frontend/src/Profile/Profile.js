import Navbar from "../Navbar/Navbar";
import "./Profile.css";
import { useEffect, useRef, useState } from "react";
import { Redirect, Link } from "react-router-dom";

function Profile() {
  let loggedIn = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchData() {
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
      }
    }
    fetchUserData();
  }, [loggedInUser._id]);

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
              {/* <li className="nav-item">
                <button className="btn nav-link">
                  <span data-feather="bar-chart-2"></span>
                  Create a new project
                </button>
              </li> */}
            </ul>
          </div>
        </nav>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="profile-container">
            <div className="main-body">
              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="profile-card">
                    <div className="p-card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar7.png"
                          alt="Admin"
                          className="rounded-circle"
                          width="150"
                        />
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
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

export default Profile;
