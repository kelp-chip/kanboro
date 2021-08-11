import axios from "axios";

const patchOrder = async (taskId, destinationId, order) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}/${destinationId}/${order}`;
  await axios.patch(URL);
  return;
};
const addTask = async (
  listId,
  taskName,
  intervals,
  notes,
  intervals_completed
) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/tasks`;
  const data = {
    listId: listId,
    name: taskName,
    intervals,
    notes,
    intervals_completed,
  };
  let { data: task } = await axios.post(URL, data);
  return task;
};

const patchTask = async (updatedTask) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/tasks/${updatedTask.id}`;
  const { data } = await axios.patch(URL, updatedTask);
  return data;
};

const deleteTask = async (taskId) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/tasks/${taskId}`;
  let message = await axios.delete(URL);
};

const taskRoutes = {
  patchOrder,
  addTask,
  deleteTask,
  patchTask,
};

export default taskRoutes;
