import Login from "components/Auth/Login";
import Signup from "components/Auth/Signup";
import styles from "./Landing.module.scss";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import LoadingServer from "components/LoadingServer";

function Landing({ isLoggedIn }) {
  const [registered, setRegistered] = useState(true);
  const [serverAwake, setServerAwake] = useState(false);

  async function wakeServer() {
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/wakeserver`
      );
      if (res) {
        await setServerAwake(true);
        await isLoggedIn();
      }
    } catch {
      console.log("something went wrong");
    }
  }
  useEffect(() => {
    wakeServer();
  }, []);

  return (
    <>
      {serverAwake ? (
        <div>
          {registered ? (
            <Login setRegistered={setRegistered} />
          ) : (
            <Signup setRegistered={setRegistered} />
          )}
        </div>
      ) : (
        <div className={styles.container}>
          <LoadingServer />
        </div>
      )}
    </>
  );
}

export default withRouter(Landing);
