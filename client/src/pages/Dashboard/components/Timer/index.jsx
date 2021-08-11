import styles from "../styles/Timer.module.scss";
import { useState, useEffect } from "react";
import chime from "sounds/taps.mp3";
import click from "sounds/click.mp3";
import Pomodoro from "./components/Pomodoro";
import Break from "./components/Break";

export default function Timer({
  incrementInterval,
  setTimer,
  intervalTime,
  shortBreakTime,
  longBreakTime,
}) {
  const timerOptions = {
    pomodoro: 0.05,
    short: shortBreakTime,
    long: longBreakTime,
  };
  const [currentTimer, setCurrentTimer] = useState("pomodoro");
  const [timerOn, setTimerOn] = useState(false);
  const [cycles, setCycles] = useState(0);
  const [sound] = useState(new Audio(chime));
  const [clickSound] = useState(new Audio(click));
  const [timeInSeconds, setTimeInSeconds] = useState(
    timerOptions[currentTimer] * 60
  );

  async function closeTimer() {
    await clickSound.play();
    await setTimer(false);
  }
  // async function reset() {
  //   await setTimerOn(false);
  //   await setTimeInSeconds(timerOptions[currentTimer] * 60);
  // }
  async function handleTimerOption(time) {
    await setCurrentTimer(time);
    await setTimeInSeconds(timerOptions[time] * 60);
    await setTimerOn(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button className={styles.close} onClick={closeTimer}>
          ✕
        </button>

        {currentTimer === "pomodoro" ? (
          <Pomodoro
            timeInSeconds={timeInSeconds}
            timerOn={timerOn}
            setTimerOn={setTimerOn}
            setTimeInSeconds={setTimeInSeconds}
            sound={sound}
            incrementInterval={incrementInterval}
            handleTimerOption={handleTimerOption}
            cycles={cycles}
            setCycles={setCycles}
          />
        ) : (
          <Break
            timeInSeconds={timeInSeconds}
            timerOn={timerOn}
            setTimerOn={setTimerOn}
            setTimeInSeconds={setTimeInSeconds}
            sound={sound}
            handleTimerOption={handleTimerOption}
          />
        )}
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
        </div>
        <section className={styles.btnWrapper}>
          <button onClick={() => handleTimerOption("pomodoro")}>
            pomodoro
          </button>
          <button onClick={() => handleTimerOption("short")}>
            short break
          </button>
          <button onClick={() => handleTimerOption("long")}>long break</button>
        </section>
      </div>
    </div>
  );
}
