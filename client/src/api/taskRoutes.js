import axios from "axios";

const patchOrder = async (taskId, destinationId, order) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}/${destinationId}/${order}`;
  await axios({
    method: "patch",
    url: URL,
    withCredentials: true,
    crossDomain: true,
    origin: process.env.REACT_APP_CLIENT_URL,
  });
  return;
};
const addTask = async (listId, taskName, intervals, addToTop) => {
  const data = { listId: listId, name: taskName, intervals };
  if (addToTop) data.addToTop = true;
  await axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URL}/tasks`,
    data: data,
    withCredentials: true,
    crossDomain: true,
    origin: process.env.REACT_APP_CLIENT_URL,
  });
};

const deleteTask = async (taskId) => {
  await axios({
    method: "delete",
    url: `${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}`,
    withCredentials: true,
    crossDomain: true,
    origin: process.env.REACT_APP_CLIENT_URL,
  });
};

const taskRoutes = { patchOrder, addTask, deleteTask };

export default taskRoutes;
