const { Task } = require("../../database/models");

module.exports = async (listId) => {
  const task = await Task.findOne({
    where: { listId },
    order: [["order", "DESC"]],
  });
  if (task) {
    let order = task.dataValues.order;
    console.log("not 0");
    order = Math.floor(task.order / 100) * 100 + 100;
    return order;
  } else {
    return 0;
  }
};
