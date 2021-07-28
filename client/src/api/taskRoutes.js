import axios from "axios";

const patchOrder = async (taskId, destinationId, order) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}/${destinationId}/${order}`;
  await axios.patch(URL);
  return;
};
const incrementInterval = async (taskId, intervalsCompleted) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}/${intervalsCompleted}`;
  await axios.patch(URL);
  return;
};
const addTask = async (listId, taskName, intervals, addToTop) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/tasks`;
  const data = { listId: listId, name: taskName, intervals };
  let { data: task } = await axios.post(URL, data);

  return task;
};

const patchTask = async (updatedTask) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/tasks`;
  const { data } = await axios.patch(URL, updatedTask);
  return data;
};

const deleteTask = async (taskId) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}`;
  await axios.delete(URL);
};

const taskRoutes = {
  patchOrder,
  addTask,
  deleteTask,
  incrementInterval,
  patchTask,
};

export default taskRoutes;
