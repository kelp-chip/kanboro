module.exports = (destination, source, list) => {
  const sourceList = list.find((list) => list.id === source.droppableId);
  const destinationList = list.find(
    (list) => list.id === destination.droppableId
  );
  const dIndex = destinationList.Tasks.findIndex(
    (task) => task.order === destination.index
  );
  const sTaskIndex = sourceList.Tasks.findIndex(
    (task) => task.order === source.index
  );
  const dListIndex = list.findIndex(
    (list) => list.id === destination.droppableId
  );
  const sListIndex = list.findIndex((list) => list.id === source.droppableId);

  const dTasks = list[dListIndex].Tasks;

  return {
    sourceList,
    dIndex,
    sTaskIndex,
    dListIndex,
    sListIndex,
    dTasks,
  };
};
