import Dashboard from "pages/Dashboard";
import UserSettings from "pages/UserSettings";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import ProtectedRoute from "components/ProtectedRoute";
import userRoutes from "api/userRoutes";
import { useState, useMemo, useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/UserContext";

export default function App() {
  const [user, setUser] = useState(true);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const history = useHistory();

  const [loggedin, setLoggedIn] = useState(true);

  async function isLoggedIn() {
    console.log("checking local storage");
    let token = localStorage.getItem("accessToken");
    if (token) {
      const res = await userRoutes.getUser(token);
      await setUser(res.user);
      history.push("/dashboard");
    }
  }
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <>
      <UserContext.Provider value={providerUser}>
        <Route
          path="/"
          exact
          render={(props) => <Landing {...props} isLoggedIn={isLoggedIn} />}
        />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/settings" component={UserSettings} />
        <div onClick={() => setLoggedIn(!loggedin)}>login</div>
      </UserContext.Provider>
    </>
  );
}
