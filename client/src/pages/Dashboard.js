import Board from "../components/Board";
import Timer from "../components/Timer";
import { useState } from "react";
import { Helmet } from "react-helmet";

function Dashboard({ listData, getUserInfo, setListData, userData }) {
  const [time, setTime] = useState(userData.intervalTime);
  const [showTimer, setShowTimer] = useState(true);

  // function setTimer(minutes) {
  //   setTime(userData);
  // }

  return (
    <div className="dashboard">
      <Helmet>
        <title>kanboro {showTimer ? `| ${time}` : ""}</title>
      </Helmet>
      {/* {userData} */}

      {/* <h2>{userData.username}'s kanboro board</h2> */}
      <Timer time={time} showTimer={showTimer}></Timer>
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
