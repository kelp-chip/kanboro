import "../styles/Navigation.scss";

function Navigation({ userData, logout }) {
  return (
    <nav>
      <a href="/">
        <h1>kanboro</h1>
      </a>
      <ul>
        {userData && (
          <li>{!userData.newUser && `welcome back, ${userData.username}!`}</li>
        )}
        {userData && (
          <li>{userData.newUser && `welcome, ${userData.username}!`}</li>
        )}

        <li>{userData && <a onClick={logout}>logout</a>}</li>
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
        {/* <li>
          {userData && (
            <img
              src={userData.avatar_url}
              alt="user avatar"
              style={{ width: "30px" }}
            ></img>
          )}
        </li> */}
      </ul>
    </nav>
  );
}

export default Navigation;
