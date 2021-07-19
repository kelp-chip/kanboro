import { useState } from "react";
import axios from "axios";
import "../styles/Auth.scss";
import requests from "../requests";

function Register({ setIsRegistered }) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const userCreated = await requests.createUser(
      registerUsername,
      registerPassword
    );
    if (userCreated) {
      await setIsRegistered(true);
    }
  };

  return (
    <div className="outer-container">
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={register} className="auth">
          <label>
            username
            <input
              className="auth-input"
              onChange={(e) => setRegisterUsername(e.target.value)}
            ></input>
          </label>
          <br />
          <label>
            password
            <input
              type="password"
              className="auth-input"
              onChange={(e) => setRegisterPassword(e.target.value)}
            ></input>
          </label>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
