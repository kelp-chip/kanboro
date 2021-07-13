const { Task, List } = require("../../database/models");

module.exports = {
  getTaskOrder: async (listId) => {
    const task = await Task.findOne({
      where: { listId },
      order: [["order", "DESC"]],
    });
    if (task) {
      let order = task.dataValues.order;
      order = Math.floor(task.order / 100) * 100 + 100;
      return order;
    } else {
      return 100;
    }
  },
  getListOrder: async (userId) => {
    const list = await List.findOne({
      where: { userId },
      order: [["order", "DESC"]],
    });
    if (list) {
      let order = list.dataValues.order;
      order = Math.floor(list.order / 100) * 100 + 100;
      return order;
    } else {
      return 100;
    }
  },
};
