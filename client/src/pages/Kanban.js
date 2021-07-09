import Board from "../components/Board";

function Kanban({ userData }) {
  return (
    <div>
      <h2>{userData.username}'s kanboro board</h2>
      <Board />
    </div>
  );
}

export default Kanban;
