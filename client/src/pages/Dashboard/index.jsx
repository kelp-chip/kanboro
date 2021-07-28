import { useState, useEffect, useContext } from "react";
import Board from "./components/Board";
import Timer from "./components/Timer";
import { withRouter } from "react-router-dom";
import listRoutes from "api/listRoutes";
import { UserContext } from "context/UserContext";
import taskRoutes from "api/taskRoutes";
import moveTask from "helpers/moveTask";

function Dashboard() {
  const [board, setBoard] = useState([]);
  const [timer, setTimer] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function incrementInterval() {
    let boardCopy = JSON.parse(JSON.stringify(board));
    let newInterval = Number(boardCopy[1].Tasks[0].intervals_completed) + 1;
    let intervals = Number(boardCopy[1].Tasks[0].intervals);
    boardCopy[1].Tasks[0].intervals_completed = newInterval;
    await setBoard(boardCopy);
    await taskRoutes.incrementInterval({
      id: boardCopy[1].Tasks[0].id,
      intervals_completed: newInterval,
    });
    if (newInterval === intervals) {
      let newBoard = await moveTask(
        boardCopy,
        2,
        1,
        0,
        0,
        boardCopy[1].Tasks[0]
      );
      await setBoard(newBoard);
    }
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
      <div className="dashboard">
        {timer && (
          <Timer
            startMins={user.intervalTime}
            incrementInterval={incrementInterval}
            setTimer={setTimer}
          />
        )}
        <Board board={board} setBoard={setBoard} setTimer={setTimer} />
        {/* <button onClick={() => setTimer(!timer)}>timer</button> */}
      </div>
    </>
  );
}

export default withRouter(Dashboard);
