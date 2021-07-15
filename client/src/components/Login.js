import { useState } from "react";
import axios from "axios";
import "../styles/Auth.scss";

function Login({ setUserData, getLists, setPage }) {
  const [loginUsername, setLoginUsername] = useState("guest");
  const [loginPassword, setLoginPassword] = useState("password2021");

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        data: {
          username: loginUsername,
          password: loginPassword,
        },
        withCredentials: true,
        crossDomain: true,
        url: `${process.env.REACT_APP_SERVER_URL}/login`,
        origin: "http://localhost:3000",
      });

      if (res.data.auth) {
        await setUserData(res.data.user);
        await getLists(res.data.user.id);
        await setPage("user");
      } else {
        console.log("did not work");
        console.log(res.data.message);
      }
    } catch (err) {
      console.log("Sorry, couldn't reach the server");
      console.log(err);
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
