import "./App.css";
import Kanban from "./pages/Kanban";
import Auth from "./pages/Auth";
import Loading from "./pages/Loading";
import axios from "axios";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";

function App(locals) {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(null);
  const [listData, setListData] = useState([]);

  const getUserInfo = async (e) => {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:8000/userInfo",
      withCredentials: true,
    });
    const { auth, user } = data;

    if (user) {
      await setUserData(user);
      await getLists(user.id);
      console.log(listData);
    }
    await setPage(auth);
  };

  const getLists = async (userId) => {
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
    <>
      <Navigation userData={userData} logout={logout} listData={listData} />
      <main className="App">
        {!page && <Loading />}

        {page === "user" && (
          <Kanban
            userData={userData}
            listData={listData}
            getUserInfo={getUserInfo}
            setListData={setListData}
            getLists={getLists}
          />
        )}
        {page === "guest" && (
          <Auth
            setUserData={setUserData}
            getLists={getLists}
            setPage={setPage}
          />
        )}
        {/* <button onClick={getUserInfo}>authorized?</button> */}
      </main>
    </>
  );
}

export default App;
