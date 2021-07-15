import Board from "../components/Board";

function Dashboard({
  listData,
  getUserInfo,
  setListData,
  userData,
  setUserData,
}) {
  return (
    <div>
      {/* <h2>{userData.username}'s kanboro board</h2> */}
      {console.log(listData)}
      <Board
        listData={listData}
        getUserInfo={getUserInfo}
        setListData={setListData}
        userData={userData}
      />
    </div>
  );
}

export default Dashboard;
