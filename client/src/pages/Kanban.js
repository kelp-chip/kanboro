import Board from "../components/Board";

function Kanban({ listData, getUserInfo, setListData }) {
  return (
    <div>
      {/* <h2>{userData.username}'s kanboro board</h2> */}
      <Board
        listData={listData}
        getUserInfo={getUserInfo}
        setListData={setListData}
      />
    </div>
  );
}

export default Kanban;
