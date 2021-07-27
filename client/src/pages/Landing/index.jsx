import Login from "components/Auth/Login";
import Signup from "components/Auth/Signup";
import styles from "./Landing.module.scss";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

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
          <h4>Server is waking up.</h4>
          {/* <div class="loader"></div> */}
          <img
            src="https://media.tenor.com/images/0dcb73b26623579cc110fc7269992898/tenor.gif"
            alt="loading gif"
          ></img>
          <h4>Thank you for your patience!</h4>
        </div>
      )}
    </>
  );
}

export default withRouter(Landing);
