import { useState } from "react";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  let handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };
  let handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };
  let handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: emailValue,
        userPassword: passwordValue,
      }),
    });
    const parsedRes = await res.json();
    if (parsedRes.loginState) {
      setLoginStatus(true);
    }
  };
  if (!loginStatus) {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">
              Email address
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
          </div>
          <div className="mb-3">
            <label htmlFor="userPassword" className="form-label">
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
  } else {
    return <Redirect to="/dashboard" />;
  }
};

export default Login;
