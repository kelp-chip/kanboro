import Login from "components/Auth/Login";
import Signup from "components/Auth/Signup";
import Header from "components/Header";
import styles from "./Landing.module.scss";
import { useState } from "react";
import { withRouter } from "react-router-dom";

function Landing() {
  const [registered, setRegistered] = useState(true);

  return (
    <body className={styles.backgroundColor}>
      <Header />
      {registered ? (
        <Login setRegistered={setRegistered} />
      ) : (
        <Signup setRegistered={setRegistered} />
      )}
    </body>
  );
}

export default withRouter(Landing);
