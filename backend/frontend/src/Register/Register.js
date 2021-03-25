import { useState } from "react";

const Register = (props) => {
  let [emailValue, setEmailValue] = useState("");
  let [passwordValue, setPasswordValue] = useState("");

  let handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  let handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };
  let handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: emailValue,
        userPassword: passwordValue,
      }),
    });
    const parsedRes = await res.json();
    console.log(parsedRes.registered);
  };
  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address{" "}
          </label>
          <input
            type="email"
            className="form-control"
            name="userEmail"
            id="userEmail"
            value={emailValue}
            onChange={handleEmailChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="userPassword"
            name="userPassword"
            value={passwordValue}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
