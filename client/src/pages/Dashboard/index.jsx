import { useState, useEffect, useContext } from "react";
import Board from "./components/Board";
import Timer from "./components/Timer";
import { withRouter } from "react-router-dom";
import listRoutes from "api/listRoutes";
import { UserContext } from "context/UserContext";
import taskRoutes from "api/taskRoutes";
import Helmet from "react-helmet";

function Dashboard() {
  const [board, setBoard] = useState([]);
  const [timer, setTimer] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function incrementInterval() {
    let boardCopy = JSON.parse(JSON.stringify(board));
    let newInterval = Number(boardCopy[1].Tasks[0].intervals_completed) + 1;
    boardCopy[1].Tasks[0].intervals_completed = newInterval;
    let task = boardCopy[1].Tasks[0];
    taskRoutes.patchTask(task);
    await setBoard(boardCopy);
  }

  useEffect(() => {
    async function getBoardData() {
      const boardData = await listRoutes.getLists(user.id);
      setBoard(boardData);
    }
    getBoardData();
  }, [user.id]);

  return (
    <>
      <Helmet>
        <title>Kanboro</title>
      </Helmet>
      <div className="dashboard">
        {timer && (
          <Timer
            incrementInterval={incrementInterval}
            setTimer={setTimer}
            intervalTime={user.interval_time}
            shortBreakTime={user.short_break_time}
            longBreakTime={user.long_break_time}
            alarmSound={user.alarm_sound}
          />
        )}
        <Board board={board} setBoard={setBoard} setTimer={setTimer} />
      </div>
    </>
  );
}

export default withRouter(Dashboard);
