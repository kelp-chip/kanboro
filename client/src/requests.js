import axios from "axios";
require("dotenv").config();

const requests = {
  getUser: async () => {
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/userInfo`,
      withCredentials: true,
      crossDomain: true,
      origin: process.env.REACT_APP_CLIENT_URL,
    });
    return data;
  },
  login: async (username, password) => {
    try {
      const res = await axios({
        method: "post",
        data: {
          username: username,
          password: password,
        },
        withCredentials: true,
        crossDomain: true,
        url: `${process.env.REACT_APP_SERVER_URL}/login`,
        origin: process.env.REACT_APP_CLIENT_URL,
      });
      return res.data;
    } catch (err) {
      console.log("Sorry, couldn't reach the server");
      console.log(err);
    }
  },
  logout: async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/logout`,
      withCredentials: true,
      crossDomain: true,
      origin: process.env.REACT_APP_CLIENT_URL,
    });
    return;
  },
  getLists: async (userId) => {
    const { data: lists } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_SERVER_URL}/lists/${userId}`,
      withCredentials: true,
      crossDomain: true,
      origin: process.env.REACT_APP_CLIENT_URL,
    });
    return lists;
  },
  patchOrder: async (taskId, destinationId, order) => {
    const URL = `${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}/${destinationId}/${order}`;
    await axios({
      method: "patch",
      url: URL,
      withCredentials: true,
      crossDomain: true,
      origin: process.env.REACT_APP_CLIENT_URL,
    });
    return;
  },
  addTask: async (listId, taskName, intervals) => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/tasks`,
      data: { listId: listId, name: taskName, intervals },
      withCredentials: true,
      crossDomain: true,
      origin: process.env.REACT_APP_CLIENT_URL,
    });
  },
  deleteTask: async (taskId) => {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}`,
      withCredentials: true,
      crossDomain: true,
      origin: process.env.REACT_APP_CLIENT_URL,
    });
  },
};

export default requests;
