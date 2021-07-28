import styles from "../styles/Timer.module.scss";
import { useState, useEffect } from "react";
import chime from "sounds/chime.wav";

export default function Timer({ incrementInterval, setTimer, interval_time }) {
  const [timerOn, setTimerOn] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(interval_time * 60);
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
  }, [timerOn, incrementInterval, sound]);

  async function reset() {
    await setTimerOn(false);
    await setTimeInSeconds(4);
  }

  return (
    <div className={styles.wrapper}>
      {console.log(interval_time)}
      <div className={styles.container}>
        <button className={styles.close} onClick={() => setTimer(false)}>
          ✕
        </button>
        <h1>
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
