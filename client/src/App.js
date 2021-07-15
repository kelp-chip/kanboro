import "./App.scss";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Loading from "./pages/Loading";
import requests from "./requests.js";
import { useState, useEffect } from "react";
require("dotenv").config();

const fauxData = {
  createdAt: "2021-07-14T21:38:09.000Z",
  id: "7b931c8f-e5a8-4745-bb20-0324654cd8a5",
  name: "todo",
  order: 100,
  updatedAt: "2021-07-14T21:38:09.000Z",
  userId: "4bfd2e3a-befa-4fa9-82a6-1b2fb94a180c",
  Tasks: [
    {
      createdAt: "2021-07-15T01:06:27.000Z",
      id: "f2388ff1-c19e-4241-b7e1-6496681b75c7",
      intervals: 2,
      intervals_completed: 0,
      listId: "7b931c8f-e5a8-4745-bb20-0324654cd8a5",
      name: "1",
      notes: null,
      order: 100,
      updatedAt: "2021-07-15T17:08:00.000Z",
    },
    {
      createdAt: "2021-07-15T01:06:27.000Z",
      id: "f2388ff1-c19e-4241-b7e1-6496681b75c7",
      intervals: 2,
      intervals_completed: 2,
      listId: "7b931c8f-e5a8-4745-bb20-0324654cd8a5",
      name: "2",
      notes: null,
      order: 200,
      updatedAt: "2021-07-15T17:08:00.000Z",
    },
  ],
};

function App(locals) {
  const [userData, setUserData] = useState(null);
  const [page, setPage] = useState(null);
  const [listData, setListData] = useState([fauxData]);

  const getUserInfo = async (e) => {
    const data = await requests.getUser();
    const { auth, user } = data;
    if (user) {
      await setUserData(user);
      await getLists(user.id);
      console.log(user);
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
    const getUser = async () => getUserInfo();

    console.log("============");

    console.log(listData);
    getUser();
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
