module.exports = (tasks, dTaskIndex) => {
  let order;
  if (tasks.length === 0) return 100;
  if (dTaskIndex === 0) {
    order = tasks[dTaskIndex].order / 2;
  } else if (dTaskIndex === -1) {
    if (tasks.length > 0) {
      let lastTaskOrderNum = tasks[tasks.length - 1].order;
      order = (Math.floor(lastTaskOrderNum / 100) + 1) * 100;
    } else {
      order = 100;
    }
  } else {
    order = (tasks[dTaskIndex].order + tasks[dTaskIndex - 1].order) / 2;
  }
  return order;
};
