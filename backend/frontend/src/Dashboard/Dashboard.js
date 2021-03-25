import Navbar from "../Navbar/Navbar";
import {useEffect, useRef, useState} from "react"
import {Redirect} from "react-router-dom"
function Dashboard() {
    let loggedIn = useRef(null);
    const [isLoggedIn, setLoggedIn] = useState(loggedIn);

  useEffect(() => {
    async function fetchData() {
      loggedIn.current = await fetch("/auth/isLoggedIn", { method: "GET" });
      setLoggedIn(loggedIn.current);
    }
    fetchData();
  }, []);

  if (isLoggedIn) {
    return (
      <div className="container">
        <Navbar />
        <h1>Dashboard</h1>
      </div>
    );
  } else {
    return (
    <Redirect to="/login" />
    )
  }
}

export default Dashboard;
