import "../styles/Navigation.scss";

function Navigation({ userData, logout }) {
  return (
    <div className="nav-container">
      <nav className="inner-nav">
        <a href="/">
          <h1>kanboro</h1>
        </a>
        <ul className="nav-right">
          {userData && (
            <li>
              {!userData.newUser && `welcome back, ${userData.username}!`}
            </li>
          )}
          {userData && (
            <li>{userData.newUser && `welcome, ${userData.username}!`}</li>
          )}

          <li>{userData && <button onClick={logout}>logout</button>}</li>
          {!userData && (
            <ul>
              <li>
                <a
                  href="https://github.com/lexykio/kanboro"
                  target="_blank"
                  rel="noreferrer"
                >
                  source code
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lexykio"
                  target="_blank"
                  rel="noreferrer"
                >
                  developer
                </a>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
