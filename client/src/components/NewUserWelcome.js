import axios from "axios";

function NewUserWelcome({ userData, setUserData }) {
  const graduate = () => {
    const userDataCopy = JSON.parse(JSON.stringify(userData));
    userDataCopy.newUser = false;
    setUserData(userDataCopy);
    axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/newUser/${userData.id}/${userData.username}`
    );
  };

  return (
    <div>
      <button onClick={graduate}>ok!</button>
      <h3>Hi there, {userData.username}!!</h3>
    </div>
  );
}

export default NewUserWelcome;
