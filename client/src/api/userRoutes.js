import axios from "axios";

const getUser = async (token) => {
  const { data } = await axios({
    method: "get",
    params: { token },
    url: `${process.env.REACT_APP_SERVER_URL}/user`,
    origin: process.env.REACT_APP_CLIENT_URL,
  });
  return data;
};

const createUser = async (username, password) => {
  const res = await axios({
    method: "post",
    data: {
      username,
      password,
    },
    url: `${process.env.REACT_APP_SERVER_URL}/user`,
  });
  console.log(res.data);
  return res.data;
};

const login = async (username, password) => {
  try {
    const res = await axios({
      method: "post",
      data: {
        username: username,
        password: password,
      },
      url: `${process.env.REACT_APP_SERVER_URL}/login`,
      origin: process.env.REACT_APP_CLIENT_URL,
    });
    return res.data;
  } catch (err) {
    console.log("Sorry, couldn't reach the server");
    console.log(err);
  }
};

const logout = async () => {
  await axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/logout`,
    crossDomain: true,
    origin: process.env.REACT_APP_CLIENT_URL,
  });
  return;
};

const userRoutes = { getUser, createUser, login, logout };

export default userRoutes;
