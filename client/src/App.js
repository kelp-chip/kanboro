import "./App.css";
import Kanban from "./pages/Kanban";
import Login from "./pages/Login";
import axios from "axios";
import { useState, useEffect } from "react";

function App(locals) {
  const [userData, setUserData] = useState(null);
  const [listData, setListData] = useState([]);

  const getUserInfo = async (e) => {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:8000/userInfo",
      withCredentials: true,
    });
    if (data.user) {
      await setUserData(data.user);
      await getLists(data.user.id);
    }
  };

  const getLists = async (userId) => {
    console.log(userData);
    let { data: lists } = await axios.get("/lists", {
      params: { userId: userId },
    });
    await setListData(lists);
  };

  const logout = async (e) => {
    e.preventDefault();
    await axios.post("/logout", {
      withCredentials: true,
      domain: "http://localhost:3000",
    });
    window.location.reload(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="App">
      {userData && `Welcome back, ${userData.username}!`}
      <br />
      {userData && (
        <img
          src={userData.avatar_url}
          alt="user avatar"
          style={{ width: "20px" }}
        ></img>
      )}
      <br />
      {userData && <button onClick={logout}>logout</button>}
      {userData ? (
        <Kanban
          userData={userData}
          listData={listData}
          getUserInfo={getUserInfo}
        />
      ) : (
        <Login setUserData={setUserData} getLists={getLists} />
      )}
    </div>
  );
}

export default App;
