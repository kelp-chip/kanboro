import { useEffect } from "react";
import Helmet from "react-helmet";

export default function Pomodoro({
  timeInSeconds,
  timerOn,
  setTimerOn,
  setTimeInSeconds,
  sound,
  incrementInterval,
  handleTimerOption,
  cycles,
  setCycles,
}) {
  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTimeInSeconds((prevTime) => {
          if (prevTime === 0) {
            setTimerOn(false);
            sound.play();
            let newCycles = cycles + 1;
            if (newCycles === 4) {
              setCycles(0);
              handleTimerOption("long");
            } else {
              setCycles(newCycles);
              handleTimerOption("short");
            }
            incrementInterval();
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [
    timerOn,
    incrementInterval,
    sound,
    handleTimerOption,
    setTimeInSeconds,
    setTimerOn,
    cycles,
    setCycles,
  ]);

  return (
    <>
      <Helmet>
        <title>
          {`Work Time | ${Math.floor(timeInSeconds / 60)}${
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
