import { useEffect } from "react";
import Helmet from "react-helmet";

export default function Break({
  timeInSeconds,
  timerOn,
  setTimerOn,
  setTimeInSeconds,
  sound,
  handleTimerOption,
}) {
  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTimeInSeconds((prevTime) => {
          if (prevTime === 0) {
            setTimerOn(false);
            sound.play();
            handleTimerOption("pomodoro");
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [setTimeInSeconds, setTimerOn, handleTimerOption, sound, timerOn]);
  return (
    <>
      <Helmet>
        <title>
          {`Break Time | ${Math.floor(timeInSeconds / 60)}${
            timeInSeconds % 60 < 10
              ? ":0" + (timeInSeconds % 60)
              : ":" + (timeInSeconds % 60)
          }`}
        </title>
      </Helmet>
      <h2>
        {Math.floor(timeInSeconds / 60)}:
        {timeInSeconds % 60 < 10
          ? `0${timeInSeconds % 60}`
          : timeInSeconds % 60}
      </h2>
    </>
  );
}
