import "./Navbar.css";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import TinyLogo from "../Images/TinyLogo.png";
function Navbar() {
  const [loggedIn, setLoggedIn] = useState(true);

  const handleSignOut = async () => {
    const response = await fetch("/auth/logout", { method: "GET" });
    const parsedResponse = await response.json();
    if (parsedResponse.logout) {
      setLoggedIn(false);
    }
  };

  if (loggedIn) {
    return (
      <header className="navbar navbar-light sticky-top nav-bg flex-md-nowrap p-0 shadow">
        <img src={TinyLogo} alt="OpTask Logo" />
        <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
          OpTask
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <button className="btn nav-link" onClick={handleSignOut}>
              Sign out
            </button>
          </li>
        </ul>
      </header>
    );
  } else {
    return <Redirect to="/login" />;
  }
}

export default Navbar;
