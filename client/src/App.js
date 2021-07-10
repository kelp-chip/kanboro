import "./App.css";
import Auth from "./components/Auth";
import Kanban from "./pages/Kanban";
import Login from "./pages/Login";
import axios from "axios";
import { useState, useEffect } from "react";

function App(locals) {
  const [userData, setUserData] = useState(null);

  const isAuth = (e) => {
    axios({
      method: "get",
      url: "http://localhost:8000/userInfo",
      withCredentials: true,
    }).then((res) => setUserData(res.data.user));
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
      <img src={userData.avatar_url} style={{ width: "20px" }}></img>
      <br />
      {userData && <button onClick={logout}>logout</button>}
      {userData ? (
        <Kanban userData={userData} />
      ) : (
        <Login setUserData={setUserData} />
      )}
      {/* {!userData && <Auth setUserData={setUserData} />} */}
    </div>
  );
}

export default App;
