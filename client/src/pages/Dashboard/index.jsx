import { useState, useEffect, useContext } from "react";
import Board from "./components/Board";
import Timer from "./components/Timer";
import { withRouter } from "react-router-dom";
import listRoutes from "api/listRoutes";
import { UserContext } from "context/UserContext";

function Dashboard() {
  const [board, setBoard] = useState([]);
  const [timer, setTimer] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function getBoardData() {
      const boardData = await listRoutes.getLists(user.id);
      setBoard(boardData);
    }
    getBoardData();
  }, [user.id]);

  return (
    <>
      {console.log(board)}
      <div className="dashboard">
        {timer && <Timer startMins={user.intervalTime} />}
        <Board board={board} setBoard={setBoard} setTimer={setTimer} />
        {/* <button onClick={() => setTimer(!timer)}>timer</button> */}
      </div>
    </>
  );
}

export default withRouter(Dashboard);
