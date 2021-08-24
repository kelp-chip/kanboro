import Dashboard from "pages/Dashboard";
import UserSettings from "pages/UserSettings";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import ProtectedRoute from "components/ProtectedRoute";
import userRoutes from "api/userRoutes";
import { useState, useMemo, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/UserContext";
// import { AlertContext } from "./context/AlertContext";
// import AlertMessage from "components/AlertMessage";

export default function App() {
  const [user, setUser] = useState("checking");
  // const [alert, setAlert] = useState(null);
  const [width, setWidth] = useState(false);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  // const providerAlert = useMemo(() => ({ alert, setAlert }), [alert, setAlert]);
  const history = useHistory();

  async function isLoggedIn() {
    const now = new Date();
    let itemStr = localStorage.getItem("accessToken");
    if (itemStr) {
      const item = JSON.parse(itemStr);
      if (now.getTime() > item.expiry) {
        localStorage.removeItem("accessToken");
        await setUser(null);
        history.push("/");
      } else {
        const res = await userRoutes.getUser(item.token);
        await setUser(res.user);
        history.push("/dashboard");
      }
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
          <Route
            path="/"
            exact
            render={(props) => <Landing {...props} isLoggedIn={isLoggedIn} />}
          />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/settings" component={UserSettings} />
        </UserContext.Provider>
      )}
      {/* <AlertContext.Provider value={providerAlert}>
        <AlertMessage />
      </AlertContext.Provider> */}
    </>
  );
}
