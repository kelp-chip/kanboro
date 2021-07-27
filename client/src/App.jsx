import Dashboard from "pages/Dashboard";
import UserSettings from "pages/UserSettings";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import ProtectedRoute from "components/ProtectedRoute";
import userRoutes from "api/userRoutes";
import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState("checking");
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const history = useHistory();

  const [loggedin, setLoggedIn] = useState(true);

  async function test() {
    let getRes = await axios.get("https://kanboro-server.herokuapp.com/test");
    let postRes = await axios.post(
      "https://kanboro-server.herokuapp.com/test",
      { cat: "luka" }
    );
    console.log(getRes.data);
    console.log(postRes.data);
  }

  async function isLoggedIn() {
    let token = localStorage.getItem("accessToken");
    if (token) {
      const res = await userRoutes.getUser(token);
      await setUser(res.user);
      history.push("/dashboard");
    } else {
      await setUser(null);
    }
  }
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <>
      {user === "checking" ? (
        <UserContext.Provider value={providerUser}>
          <Header />
          <span>Loading</span>
        </UserContext.Provider>
      ) : (
        <UserContext.Provider value={providerUser}>
          <Header />
          <button onClick={test}>TEST API</button>
          <Route
            path="/"
            exact
            render={(props) => <Landing {...props} isLoggedIn={isLoggedIn} />}
          />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/settings" component={UserSettings} />
        </UserContext.Provider>
      )}
    </>
  );
}
