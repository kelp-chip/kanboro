import "./App.css";
import Kanban from "./pages/Kanban";
import Login from "./pages/Login";
import axios from "axios";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App(locals) {
  const [userData, setUserData] = useState(null);
  const [listData, setListData] = useState([]);

  const formatListData = (listData, tasks) => {
    const lists = {};
    listData.forEach((list) => {
      lists[list.id] = { name: list.name, items: [], tasks: tasks };
    });
    return lists;
  };

  const isAuth = async (e) => {
    const res = await axios({
      method: "get",
      url: "http://localhost:8000/userInfo",
      withCredentials: true,
    });
    const user = res.data.user;
    await setUserData(user);
    if (user) {
      getLists(user);
    }
  };

  const getLists = async (user) => {
    await axios.get("/lists", { params: { userId: user.id } }).then((res) => {
      const lists = formatListData(res.data, getTasks());
      setListData(lists);
    });
  };

  const getTasks = () => {
    return [
      { id: uuidv4(), content: "Shower" },
      { id: uuidv4(), content: "Clean Room" },
    ];
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
    isAuth();
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
          setListData={setListData}
        />
      ) : (
        <Login setUserData={setUserData} />
      )}
      {/* {!userData && <Auth setUserData={setUserData} />} */}
    </div>
  );
}

export default App;
