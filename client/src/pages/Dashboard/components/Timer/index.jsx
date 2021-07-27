import styles from "../styles/Timer.module.scss";
import { useState, useEffect } from "react";
import chime from "sounds/chime.wav";

export default function Timer({ startMins, incrementInterval }) {
  const [timerOn, setTimerOn] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(startMins * 60);
  const [sound] = useState(new Audio(chime));

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTimeInSeconds((prevTime) => {
          if (prevTime === 0) {
            setTimerOn(false);
            sound.play();
            incrementInterval();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  async function reset() {
    await setTimerOn(false);
    await setTimeInSeconds(4);
  }

  //   let minutes = Math.floor(timeInSeconds / 60);
  //   let seconds = timeInSeconds % 60;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>
          {/* {timeInSeconds} */}
          {Math.floor(timeInSeconds / 60)}:
          {timeInSeconds % 60 < 10
            ? `0${timeInSeconds % 60}`
            : timeInSeconds % 60}
        </h1>
        <div className={styles.btnContainer}>
          {timerOn ? (
            <button
              className={styles.timerBtn}
              onClick={() => setTimerOn(false)}
            >
              stop
            </button>
          ) : (
            <button
              className={`${styles.timerBtn} ${styles.raisedBtn}`}
              onClick={() => setTimerOn(true)}
            >
              start
            </button>
          )}
          <button
            className={`${styles.timerBtn} ${styles.raisedBtn}`}
            onClick={reset}
          >
            reset
          </button>
        </div>
      </div>
    </div>
  );
}
