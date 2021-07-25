import styles from "./Auth.module.scss";
export default function Signup({ setRegistered }) {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <h2>Signup</h2>
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
          <label>
            re-enter password
            <br />
            <input type="password" placeholder="password"></input>
          </label>
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
