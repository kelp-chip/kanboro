import styles from "./Header.module.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory, useLocation } from "react-router-dom";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [path, setPath] = useState();

  const history = useHistory();
  const location = useLocation();

  async function logout() {
    await localStorage.removeItem("accessToken");
    await setUser(null);
    history.push("/");
  }

  useEffect(() => {
    let loc = location.pathname.slice(1, location.pathname.length);
    setPath(loc);
  }, [location.pathname]);

  return (
    <nav className={styles.wrapper}>
      <div className={styles.container}>
        <Link to={user ? "/dashboard" : "/"}>
          <h1>
            kanboro<span className={styles.period}>.</span>
          </h1>
        </Link>
        {user ? (
          <ul className={styles.navItems}>
            <li className={styles.liFlex}>welcome {user.username}!</li>
            <li>
              <Link
                to="/dashboard"
                className={`${styles.navLink} ${
                  path === "dashboard" && styles.focus
                }`}
              >
                dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`${styles.navLink} ${
                  path === "settings" && styles.focus
                }`}
              >
                settings
              </Link>
            </li>
            <li onClick={logout}>
              <span className={styles.navLink}>logout</span>
            </li>
            <li>
              <div className="avatarContainer">
                <img src={user.avatar_url} alt="avatar"></img>
              </div>
            </li>
          </ul>
        ) : (
          <ul className={styles.navItems}>
            <li className={styles.navLink}>
              <a href="https://github.com/lexykio/kanboro" alt="github repo">
                source code
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
