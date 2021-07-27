import { useEffect, useState } from "react";

export default function Timer() {
  const [loadingMessage, setLoadingMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadingMessage(true);
    }, 1000);
  }, []);
  return (
    <>
      {loadingMessage && (
        <>
          <h4>Server is waking up.</h4>
          <img
            src="https://media.tenor.com/images/0dcb73b26623579cc110fc7269992898/tenor.gif"
            alt="loading gif"
          ></img>
          <h4>Thank you for your patience!</h4>
        </>
      )}
    </>
  );
}
