import styles from "./Header.module.scss";
export default function Header() {
  return (
    <nav className={styles.wrapper}>
      <div className={styles.container}>
        <h1>kanboro</h1>
        <ul className={styles.navItems}>
          <li>settings</li>
          <li>logout</li>
        </ul>
      </div>
    </nav>
  );
}
