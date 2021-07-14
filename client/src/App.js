import "./App.css";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Loading from "./pages/Loading";
import axios from "axios";
import { useState, useEffect } from "react";

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
      console.log(user);
    }
    await setPage(auth);
  };

  const getLists = async (userId) => {
    let { data: lists } = await axios.get("/lists", {
      params: { userId: userId },
      withCredentials: true,
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
