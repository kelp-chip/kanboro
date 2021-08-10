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
  const [width, setWidth] = useState(false);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const history = useHistory();
  const [userWelcome, setUserWelcome] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleWindowResize = async () => {
      await setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      {user === "checking" ? (
        <UserContext.Provider value={providerUser}>
          <Header />
        </UserContext.Provider>
      ) : (
        <UserContext.Provider value={providerUser}>
          <Header />
          {/* {userWelcome && (
            <div className="welcomePopup">Welcome, {user.username}!</div>
          )} */}
          <Route
            path="/"
            exact
            render={(props) => (
              <Landing
                {...props}
                isLoggedIn={isLoggedIn}
                setUserWelcome={setUserWelcome}
              />
            )}
          />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/settings" component={UserSettings} />
        </UserContext.Provider>
      )}
    </>
  );
}

//1090
