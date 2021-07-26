//change order locally

module.exports = (list, dListIndex, sListIndex, dIndex, sTaskIndex, task) => {
  //remove task from source
  list[sListIndex].Tasks.splice(sTaskIndex, 1);

  //add task to destination
  if (dIndex === -1) {
    list[dListIndex].Tasks.push(task);
  } else if (dIndex === 0) {
    list[dListIndex].Tasks.unshift(task);
  } else {
    list[dListIndex].Tasks.splice(dIndex, 0, task);
  }

  return list;
};
