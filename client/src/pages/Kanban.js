import Board from "../components/Board2";

function Kanban({ userData, listData, getUserInfo }) {
  return (
    <div>
      <h2>{userData.username}'s kanboro board</h2>
      <Board listData={listData} getUserInfo={getUserInfo} />
    </div>
  );
}

export default Kanban;
