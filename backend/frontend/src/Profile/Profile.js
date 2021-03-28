import { useState } from "react";
import "./Profile.css";

const Profile = (props) => {
  let [nameValue, setNameValue] = useState("");
  let [institutionValue, setInstValue] = useState("");
  let [jobValue, setJobValue] = useState("");
  let [emailValue, setEmailValue] = useState("");

  let handleNameChange = (event) => {
    setNameValue(event.target.value);
  }
  let handleInstChange = (event) => {
    setInstValue(event.target.value);
  }
  let handleJobChange = (event) => {
    setJobValue(event.target.value);
  }
  let handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  let handleUpdate = async (event) => {
    event.preventDefault();

    const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userFullName: nameValue,
          userInst: institutionValue,
          userJob: jobValue,
          userEmail: emailValue,
        }),
      });
      const parsedRes = await res.json();
      console.log(parsedRes.registered);
  };
  return (
    
  );
};

export default Profile;