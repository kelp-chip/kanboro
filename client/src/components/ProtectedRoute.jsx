import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!!user) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
