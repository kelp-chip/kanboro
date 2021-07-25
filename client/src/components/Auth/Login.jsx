import styles from "./Auth.module.scss";
export default function Login({ setRegistered }) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Login</h2>
        <form>
          <label>
            username
            <br />
            <input type="text" placeholder="username"></input>
          </label>
          <label>
            password
            <br />
            <input type="text" placeholder="password"></input>
          </label>
          <br />
          <input type="submit" className={styles.submitBtn}></input>
        </form>
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
        <button>Login as Guest</button>
      </div>
    </main>
  );
}
