import Login from "components/Auth/Login";
import Signup from "components/Auth/Signup";
import styles from "./Landing.module.scss";
import taskStyle from "../Dashboard/components/styles/Task.module.scss";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import LoadingServer from "components/LoadingServer";
import edit from "images/edit.svg";
import clock from "images/clock.svg";

function Landing({ isLoggedIn, setUserWelcome }) {
  const [registered, setRegistered] = useState(true);
  const [serverAwake, setServerAwake] = useState(false);

  async function wakeServer() {
    // try {
    let res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/wakeserver`);
    if (res) {
      await setServerAwake(true);
      await isLoggedIn();
    }
    // } catch {
    //   console.log("something went wrong");
    // }
  }
  useEffect(() => {
    wakeServer();
  }, []);

  return (
    <>
      {serverAwake ? (
        <main>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              {registered ? (
                <Login
                  setRegistered={setRegistered}
                  setUserWelcome={setUserWelcome}
                />
              ) : (
                <Signup setRegistered={setRegistered} />
              )}
              <div className={styles.taskContainer}>
                <div className={taskStyle.taskbox}>
                  <div className={taskStyle.header}>
                    <div className={taskStyle.title}>Make things happen</div>
                  </div>
                  <div className={taskStyle.notes}>
                    kanban board + pomodoro timer
                    <p>
                      Plan daily tasks and consider how long each
                      <br />
                      task should take you to get a better handle on <br />
                      your day.
                    </p>
                  </div>
                  <div className={taskStyle.options}>
                    <button className={taskStyle.optionBtn}>
                      <img
                        src={edit}
                        className={taskStyle.edit}
                        alt="edit"
                      ></img>
                    </button>
                    <button className={taskStyle.delete}>✕</button>

                    <div className={styles.time}>
                      <button>
                        <img
                          src={clock}
                          className={taskStyle.edit}
                          alt="clock"
                        ></img>
                      </button>
                    </div>
                    <span className={taskStyle.intervals}>0/1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className={styles.loadingContainer}>
          <LoadingServer />
        </div>
      )}
    </>
  );
}

export default withRouter(Landing);
