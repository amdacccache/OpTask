import { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Profile.css";


const UpdateProfile = (props) => {
  let loggedIn = useRef(null);
  const [isLoggedIn, setLoggedIn] = useState(loggedIn);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const result = await fetch("/auth/isLoggedIn", { method: "GET"});
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
        const userDataResult = await fetch(`/userData/${loggedInUser._id}`, { method: "GET"});
        const parsedUserDataResult = await userDataResult.json();
        setNameValue(parsedUserDataResult.fullname);
        setInstValue(parsedUserDataResult.institution);
        setJobValue(parsedUserDataResult.job);
        setLocationValue(parsedUserDataResult.location);
        setEmailValue(parsedUserDataResult.username);
      }
    }
    fetchUserData();
  }, [loggedInUser._id]);

  /* useStates established to prepopulate form */
  let [nameValue, setNameValue] = useState("");
  let [institutionValue, setInstValue] = useState("");
  let [jobValue, setJobValue] = useState("");
  let [locationValue, setLocationValue] = useState("");
  let [emailValue, setEmailValue] = useState("");
  let [updateStatus, setUpdateStatus] = useState(false);

  let handleNameChange = (event) => {
    setNameValue(event.target.value);
  }
  let handleInstChange = (event) => {
    setInstValue(event.target.value);
  }
  let handleJobChange = (event) => {
    setJobValue(event.target.value);
  }
  let handleLocationChange = (event) => {
    setLocationValue(event.target.value);
  }
  let handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  let handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      userFullName: nameValue,
      userInstitution: institutionValue,
      userJob: jobValue,
      userLocation: locationValue,
      userEmail: emailValue,
      id: loggedInUser._id
    }
    //console.log(dataToSend)

    const res = await fetch("/userData/updateProfile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });
    const parsedRes = res.json();
    if (parsedRes.registered) {
      setUpdateStatus(true);
      //console.log(updateStatus);
    }
  };
  
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
                <a className="nav-link active" href="/profile">
                <span data-feather="file"></span>
                Profile
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <form onSubmit={handleSubmit} className="profile-container">
          <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="profile-card">
                  <div className="p-card-body">
                    <div className="d-flex flex-column align-items-center text-center">
                      <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                      <div className="mt-3">
                        <button type="submit" className="btn btn-primary">
                          Save Profile
                        </button>
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
                      <input 
                        className="col-sm-9 text-secondary"
                        value={nameValue}
                        type="text"
                        name="fullname"
                        onChange={handleNameChange}
                        required
                      />
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Job</h6>
                      </div>
                      <input 
                        className="col-sm-9 text-secondary"
                        value={jobValue}
                        type="text"
                        name="job"
                        onChange={handleJobChange}
                        required
                      />
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Institution</h6>
                      </div>
                      <input 
                        className="col-sm-9 text-secondary"
                        value={institutionValue}
                        type="text"
                        name="institution"
                        onChange={handleInstChange}
                        required
                      />
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <input 
                        className="col-sm-9 text-secondary"
                        value={emailValue}
                        type="email"
                        name="email"
                        onChange={handleEmailChange}
                      />
                    </div>
                    <hr/>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Location</h6>
                      </div>
                      <input 
                        className="col-sm-9 text-secondary"
                        value={locationValue}
                        type="text"
                        name="location"
                        onChange={handleLocationChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
};

export default UpdateProfile;