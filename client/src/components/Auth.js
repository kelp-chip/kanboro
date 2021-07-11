import { useState } from "react";
import axios from "axios";

function Auth({ setUserData }) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "/register",
    }).then(({ data }) => {
      console.log(data);
    });
  };
  const login = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "/login",
    }).then(({ data }) => {
      setUserData(data);
    });
    window.location.reload(false);
  };

  return (
    <div>
      <h1>Authentication</h1>
      <h2>Register</h2>
      <form onSubmit={register}>
        <label>
          username
          <input onChange={(e) => setRegisterUsername(e.target.value)}></input>
        </label>
        <br />
        <label>
          password
          <input onChange={(e) => setRegisterPassword(e.target.value)}></input>
        </label>
        <button type="submit">submit</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={login}>
        <label>
          username
          <input onChange={(e) => setLoginUsername(e.target.value)}></input>
        </label>
        <br />
        <label>
          password
          <input onChange={(e) => setLoginPassword(e.target.value)}></input>
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Auth;
