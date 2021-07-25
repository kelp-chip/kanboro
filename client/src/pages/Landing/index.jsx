import Login from "components/Auth/Login";
import Signup from "components/Auth/Signup";
import { useState } from "react";

export default function Landing() {
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
