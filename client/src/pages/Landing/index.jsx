import Login from "components/Auth/Login";
import Signup from "components/Auth/Signup";
import { useState } from "react";
import { withRouter } from "react-router-dom";

function Landing() {
  const [registered, setRegistered] = useState(true);

  return (
    <>
      {registered ? (
        <Login setRegistered={setRegistered} />
      ) : (
        <Signup setRegistered={setRegistered} />
      )}
    </>
  );
}

export default withRouter(Landing);
