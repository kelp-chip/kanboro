import styles from "./Auth.module.scss";
import { useState } from "react";
import validateNewUser from "../../helpers/validateUserInputs";
import userRoutes from "api/userRoutes";

export default function Signup({ setRegistered }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const [validationMessage, setValidationMessage] = useState(null);

  async function createUser(e) {
    e.preventDefault();
    let { valid, message } = validateNewUser(
      username,
      password,
      reenteredPassword
    );
    if (!valid) {
      setWarning(message);
    } else {
      await setWarning(null);
      const res = await userRoutes.createUser(username, password);
      if (res.success) {
        await setValidationMessage(`${username} account has been created!`);
        setTimeout(function () {
          setRegistered(true);
        }, 3000);
      } else {
        console.log(res.message);
        await setWarning(res.message);
      }
    }
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Signup</h2>
        {validationMessage && (
          <div className={styles.successMessage}>{validationMessage}</div>
        )}
        <form onSubmit={createUser}>
          <label>
            username
            <br />
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </label>
          <label>
            password
            <br />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </label>
          <label>
            re-enter password
            <br />
            <input
              type="password"
              placeholder="password"
              value={reenteredPassword}
              onChange={(e) => {
                setReenteredPassword(e.target.value);
              }}
            ></input>
          </label>
          {warning && (
            <div className={styles.warning}>
              <ul>
                {warning.map((message, i) => (
                  <li key={i}>{message}</li>
                ))}
              </ul>
            </div>
          )}
          <input type="submit" className={styles.submitBtn} />
        </form>
        <span>
          already have an account?{" "}
          <button
            className={styles.btnLink}
            onClick={() => {
              setRegistered(true);
            }}
          >
            Login
          </button>
        </span>
      </div>
      <br />
    </main>
  );
}
