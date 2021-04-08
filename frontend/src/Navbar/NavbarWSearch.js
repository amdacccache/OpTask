import "./Navbar.css";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import NavLogo from "../Images/NavLogo.png";

function NavbarWSearch(props) {
  const [loggedIn, setLoggedIn] = useState(true);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSignOut = async () => {
    const response = await fetch("/auth/logout", { method: "GET" });
    const parsedResponse = await response.json();
    if (parsedResponse.logout) {
      setLoggedIn(false);
      props.logoutPressed();
    }
  };

  const handleSearchSubmit = (event) => {
    setSearchSubmitted(true);
    event.preventDefault();
  };

  const handleSearchFormChange = (event) => {
    setSearchValue(event.target.value);
  };

  if (loggedIn && !searchSubmitted) {
    return (
      <header className="navbar navbar-light sticky-top nav-bg flex-md-nowrap p-0 shadow">

        <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
        <img src={NavLogo} alt="OpTask Logo" className="me-1"/>
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
        <form
          className="w-100 ms-2"
          id="navbarSearchForm"
          onSubmit={handleSearchSubmit}
          value={searchValue}
          onChange={handleSearchFormChange}
        >
          <input
            className="form-control form-control-dark w-100"
            type="text"
            placeholder="Search"
            aria-label="Search"
            required
          />
        </form>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <button className="btn nav-link" onClick={handleSignOut}>
              Sign out
            </button>
          </li>
        </ul>
      </header>
    );
  } else if (loggedIn && searchSubmitted) {
    return <Redirect push to={"/search/" + searchValue} />;
  } else {
    return <Redirect to={"/login"} />;
  }
}

NavbarWSearch.propTypes = {
  logoutPressed: PropTypes.func.isRequired,
};

export default NavbarWSearch;
