// import axios from "axios";
require("dotenv").config();

const requests = {
  getUser: (cb) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/userInfo`, {
      method: "get",
      credentials: "include",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => cb(data));
  },
  login: async (username, password, cb) => {
    try {
      fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
        method: "post",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json)
        .then((data) => cb(data));
    } catch (err) {
      console.log("Sorry, couldn't reach the server");
      console.log(err);
    }
  },
  logout: async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      method: "post",
      mode: "cors",
      credentials: "include",
    });
    return;
  },
  getLists: async (userId) => {
    const { data: lists } = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/lists/${userId}`,
      {
        method: "get",
        mode: "cors",
        credentials: "include",
      }
    );
    return lists;
  },
  patchOrder: async (taskId, destinationId, order) => {
    const URL = `${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}/${destinationId}/${order}`;
    await fetch(URL, {
      method: "patch",
      mode: "cors",
      credentials: "include",
    });
    return;
  },
  addTask: async (listId, taskName, intervals) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/tasks`, {
      method: "post",
      body: JSON.stringify({ listId: listId, name: taskName, intervals }),
      mode: "cors",
      credentials: "include",
    });
  },
  deleteTask: async (taskId) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}`, {
      method: "delete",
      mode: "cors",
      credentials: "include",
    });
  },
};

export default requests;
