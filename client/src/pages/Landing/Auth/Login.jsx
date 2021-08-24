import styles from "./Auth.module.scss";
import { useState, useContext } from "react";
import userRoutes from "api/userRoutes";
import { UserContext } from "context/UserContext";
import { useHistory } from "react-router-dom";

export default function Login({ setRegistered }) {
  const MINS = 10;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  async function loginUser(e) {
    e.preventDefault();
    const now = new Date();
    await setWarning(null);
    const res = await userRoutes.login(username, password);
    if (res.success) {
      let item = {
        token: res.accessToken,
        expiry: now.getTime() + MINS * 60000,
      };
      localStorage.setItem("accessToken", JSON.stringify(item));
      await setUser(res.user);
      history.push("/dashboard");
    } else {
      setWarning([res.message]);
    }
  }

  async function loginGuest(e) {
    e.preventDefault();
    const now = new Date();
    await setWarning(null);
    const res = await userRoutes.login("guest", "Password11!");
    if (res.success) {
      let item = {
        token: res.accessToken,
        expiry: now.getTime() + MINS * 60000,
      };
      localStorage.setItem("accessToken", JSON.stringify(item));
      await setUser(res.user);
      history.push("/dashboard");
    } else {
      setWarning([res.message]);
    }
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form onSubmit={loginUser}>
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
          {warning && (
            <div className={styles.warning}>
              <ul>
                {warning.map((message, i) => (
                  <li key={i}>{message}</li>
                ))}
              </ul>
            </div>
          )}
          <input type="submit" className={styles.submitBtn}></input>
        </form>
        <button onClick={loginGuest}>Login as Guest</button>
        <span>
          new user?{" "}
          <button
            className={styles.btnLink}
            onClick={() => {
              setRegistered(false);
            }}
          >
            Signup
          </button>
        </span>
      </div>
    </main>
  );
}
