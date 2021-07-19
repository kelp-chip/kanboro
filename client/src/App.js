import "./App.scss";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Loading from "./pages/Loading";
import requests from "./requests.js";
import { useState, useEffect } from "react";
require("dotenv").config();

function App(locals) {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(null);
  const [listData, setListData] = useState([]);

  const getUserInfo = async (e) => {
    const data = await requests.getUser();
    const { auth, user } = data;

    if (user) {
      await setUserData(user);
      await getLists(user.id);
    }
    await setPage(auth);
  };

  const getLists = async (userId) => {
    let lists = await requests.getLists(userId);
    await setListData(lists);
  };

  const logout = async (e) => {
    e.preventDefault();
    await requests.logout();
    window.location.reload(false);
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {userData && console.log(userData)}
      <Navigation userData={userData} logout={logout} />
      <main className="App">
        {!page && <Loading />}
        {page === "user" && (
          <Dashboard
            listData={listData}
            getUserInfo={getUserInfo}
            setListData={setListData}
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
