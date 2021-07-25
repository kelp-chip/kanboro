import Dashboard from "pages/Dashboard";
import UserSettings from "pages/UserSettings";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import ProtectedRoute from "components/ProtectedRoute";
import { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/UserContext";

export default function App() {
  const [user, setUser] = useState(true);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const history = useHistory();

  const [loggedin, setLoggedIn] = useState(true);
  return (
    <>
      <UserContext.Provider value={providerUser}>
        <Route path="/" exact component={Landing} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/settings" component={UserSettings} />
        <div onClick={() => setLoggedIn(!loggedin)}>login</div>
      </UserContext.Provider>
    </>
  );
}
