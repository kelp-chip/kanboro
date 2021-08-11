import axios from "axios";

const getUser = async (token) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/user`;
  const PARAMS = { params: { token } };
  const { data } = await axios.get(URL, PARAMS);
  return data;
};

const createUser = async (username, password) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/user`;
  const DATA = { username, password };
  const { data } = await axios.post(URL, DATA);
  return data;
};

const patchUser = async (id, updatedAttributes) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/user/:${id}`;
  const { user } = await axios.patch(URL, updatedAttributes);
  return user;
};

const login = async (username, password) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/login`;
  const DATA = { username, password };
  try {
    const { data } = await axios.post(URL, DATA);
    return data;
  } catch (err) {
    console.log(err);
    return { success: false, message: "Sorry, couldn't reach the server" };
  }
};

const logout = async () => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/logout`;
  await axios.post(URL);
  return;
};

const userRoutes = { getUser, createUser, login, logout };

export default userRoutes;
