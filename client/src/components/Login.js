import { useState } from "react";
import "../styles/Auth.scss";
import requests from "../requests";

function Login({ setUserData, getLists, setPage }) {
  const [loginUsername, setLoginUsername] = useState("guest");
  const [loginPassword, setLoginPassword] = useState("password2021");

  const login = async (e) => {
    e.preventDefault();
    const data = await requests.login(loginUsername, loginPassword);

    if (data.auth) {
      await setUserData(data.user);
      await getLists(data.user.id);
      await setPage("user");
    } else {
      console.log("did not work");
      console.log(data.message);
    }
  };

  return (
    <div className="outer-container">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={login} className="auth">
          <label>
            username
            <input
              className="auth-input"
              onChange={(e) => setLoginUsername(e.target.value)}
              value={loginUsername}
            ></input>
          </label>
          <br />
          <label>
            password
            <input
              type="password"
              className="auth-input"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            ></input>
          </label>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
