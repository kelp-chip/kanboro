import styles from "./Header.module.scss";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory, useLocation } from "react-router-dom";
import gear from "images/gear.svg";
import logoutImg from "images/logout.svg";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [path, setPath] = useState();
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const dropDownRef = useRef();
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
    document.addEventListener("mousedown", async (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        await setDropDownVisible(false);
      }
    });
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
            <li className={styles.liFlex}>you got this, {user.username}!</li>

            <li
              className={styles.dropDown}
              onClick={() => setDropDownVisible(!dropDownVisible)}
            >
              <div className="avatarContainer">
                <img src={user.avatar_url} alt="avatar"></img>
              </div>
              <div
                className={styles.dropDownMenu}
                ref={dropDownRef}
                style={{ display: dropDownVisible ? "block" : "none" }}
              >
                <ul>
                  <Link to="/settings">
                    <li>
                      <img src={gear} alt="settings"></img>settings
                    </li>
                  </Link>
                  <li onClick={logout}>
                    <img src={logoutImg} width="20px" alt="logout"></img>logout
                  </li>
                </ul>
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
            <li className={styles.navLink}>
              <a href="https://lexyk.io" alt="github repo">
                developer
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
