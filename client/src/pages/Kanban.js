import Board from "../components/Board2";

function Kanban({ userData, listData, setListData }) {
  return (
    <div>
      <h2>{userData.username}'s kanboro board</h2>
      <Board listData={listData} setListData={setListData} />
    </div>
  );
}

export default Kanban;
