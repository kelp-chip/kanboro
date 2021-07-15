import { useState } from "react";
import axios from "axios";
import "../styles/Auth.scss";

function Register({ setIsRegistered }) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_SERVER_URL}/register`,
    })
      .then(({ data }) => {
        setIsRegistered(true);
      })
      .catch((err) => {
        console.log("sorry, something went wrong");
      });
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
