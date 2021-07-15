import "./App.scss";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Loading from "./pages/Loading";
import axios from "axios";
import { useState, useEffect } from "react";
require("dotenv").config();

function App(locals) {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(null);
  const [listData, setListData] = useState([]);

  const getUserInfo = async (e) => {
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/userInfo`,
      withCredentials: true,
    });
    const { auth, user } = data;

    if (user) {
      await setUserData(user);
      await getLists(user.id);
      console.log(user);
    }
    await setPage(auth);
  };

  const getLists = async (userId) => {
    let { data: lists } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/lists`,
      {
        params: { userId: userId },
        withCredentials: true,
      }
    );
    await setListData(lists);
  };

  const logout = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      withCredentials: true,
    });
    window.location.reload(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navigation userData={userData} logout={logout} />
      <main className="App">
        {!page && <Loading />}

        {page === "user" && (
          <Dashboard
            listData={listData}
            getUserInfo={getUserInfo}
            setListData={setListData}
            userData={userData}
            setUserData={setUserData}
            userData={userData}
          />
        )}
        {page === "guest" && (
          <Auth
            setUserData={setUserData}
            getLists={getLists}
            setPage={setPage}
          />
        )}
      </main>
    </>
  );
}

export default App;
