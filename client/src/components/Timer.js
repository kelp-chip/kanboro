function Timer({ time, showTimer }) {
  return (
    <div className="timer-container">
      <h2 id="timer">{showTimer && time}</h2>
    </div>
  );
}

export default Timer;
