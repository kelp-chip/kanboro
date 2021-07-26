import Login from "components/Auth/Login";
import Signup from "components/Auth/Signup";
import styles from "./Landing.module.scss";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function Landing({ isLoggedIn }) {
  const [registered, setRegistered] = useState(true);

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <body className={styles.backgroundColor}>
      {registered ? (
        <Login setRegistered={setRegistered} />
      ) : (
        <Signup setRegistered={setRegistered} />
      )}
    </body>
  );
}

export default withRouter(Landing);
