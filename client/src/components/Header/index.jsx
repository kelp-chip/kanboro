import styles from "./Header.module.scss";
import kanboro from "../../images/kanb.svg";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  return (
    <nav className={styles.wrapper}>
      <div className={styles.container}>
        <h1>
          kanboro
          {/* <img src={kanboro} alt="kanboro" width="200px"></img> */}
        </h1>
        {user ? (
          <ul className={styles.navItems}>
            <li>settings</li>
            <li>logout</li>
          </ul>
        ) : (
          <ul className={styles.navItems}>
            <li>source code</li>
            {/* <li>logout</li> */}
          </ul>
        )}
      </div>
    </nav>
  );
}
