import "../styles/Navigation.scss";

function Navigation({ userData, logout }) {
  return (
    <nav>
      <h1>Kanboro</h1>
      <ul>
        <li>{userData && `Welcome back, ${userData.username}!`}</li>
        <li>{userData && <a onClick={logout}>logout</a>}</li>
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
