import Board from "../components/Board";

function Dashboard({
  listData,
  getUserInfo,
  setListData,
  userData,
  setUserData,
}) {
  return (
    // <div>
    //   {/* <h2>{userData.username}'s kanboro board</h2> */}
    //   <Board
    //     listData={listData}
    //     getUserInfo={getUserInfo}
    //     setListData={setListData}
    //     userData={userData}
    //   />
    // </div>
    <>
      {console.log(userData)}
      Got here!!
    </>
  );
}

export default Dashboard;
