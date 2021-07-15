import Board from "../components/Board";
import NewUserWelcome from "../components/NewUserWelcome";

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
      <Board
        listData={listData}
        getUserInfo={getUserInfo}
        setListData={setListData}
        userData={userData}
      />
      {/* {userData.newUser && (
        <NewUserWelcome userData={userData} setUserData={setUserData} />
      )} */}
    </div>
  );
}

export default Dashboard;
