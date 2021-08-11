import Header from "components/Header";
import { withRouter } from "react-router-dom";
import styles from "./UserSettings.module.scss";

function UserSettings() {
  return (
    <main className={styles.container}>
      <h2>User Settings</h2>
      <div className={styles.sign}>COMING SOON</div>
      {/* <form>
        <div>
          <label for="intervalTime">pomodoro</label>
          <input type="text"></input>
        </div>
        <div>
          <label for="intervalTime">short break</label>
          <input type="text"></input>
        </div>
        <div>
          <label for="intervalTime">long break</label>
          <input type="text"></input>
        </div>
        <div>
          <label for="intervalTime">alarm sound</label>
          <input type="text"></input>
        </div>
        <div>
          <label for="intervalTime">current password</label>
          <input type="text"></input>
        </div>
        <div>
          <label for="intervalTime">new password</label>
          <input type="text"></input>
        </div>
      </form> */}
    </main>
  );
}

export default withRouter(UserSettings);
