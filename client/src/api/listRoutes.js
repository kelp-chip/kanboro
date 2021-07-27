import axios from "axios";

const getLists = async (userId) => {
  const { data: lists } = await axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER_URL}/lists/${userId}`,
    crossDomain: true,
    origin: process.env.REACT_APP_CLIENT_URL,
  });
  return lists;
};

const listRoutes = { getLists };

export default listRoutes;
