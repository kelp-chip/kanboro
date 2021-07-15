import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";

function Auth({ setUserData, getLists, setPage }) {
  const [isRegistered, setIsRegistered] = useState(true);

  return (
    <>
      {isRegistered ? (
        <Login
          setUserData={setUserData}
          getLists={getLists}
          setPage={setPage}
        />
      ) : (
        <Register setIsRegistered={setIsRegistered} />
      )}
      {isRegistered && (
        <button onClick={() => setIsRegistered(false)}>
          not yet registered?
        </button>
      )}
      {!isRegistered && (
        <button onClick={() => setIsRegistered(true)}>already a user?</button>
      )}
    </>
  );
}

export default Auth;
