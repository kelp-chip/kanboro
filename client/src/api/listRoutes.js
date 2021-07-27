import axios from "axios";

const getLists = async (userId) => {
  const URL = `${process.env.REACT_APP_SERVER_URL}/lists/${userId}`;
  const { data: lists } = await axios.get(URL);
  return lists;
};

const listRoutes = { getLists };

export default listRoutes;
