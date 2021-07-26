import { useState, useEffect, useContext } from "react";
import Board from "./components/Board";
import { withRouter } from "react-router-dom";
import listRoutes from "api/listRoutes";
import { UserContext } from "context/UserContext";

function Dashboard() {
  const [board, setBoard] = useState([]);
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
        <Board board={board} setBoard={setBoard} />
      </div>
    </>
  );
}

export default withRouter(Dashboard);
