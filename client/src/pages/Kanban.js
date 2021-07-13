import Board from "../components/Board";

function Kanban({ userData, listData, getUserInfo, setListData, getLists }) {
  return (
    <div>
      {/* <h2>{userData.username}'s kanboro board</h2> */}
      <Board
        listData={listData}
        getUserInfo={getUserInfo}
        setListData={setListData}
        getLists={getLists}
      />
    </div>
  );
}

export default Kanban;
