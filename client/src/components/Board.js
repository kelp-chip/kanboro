import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import axios from "axios";
import getOrder from "../helpers/getOrder";
import moveTask from "../helpers/moveTask";

function Board({ listData, setListData, getUserInfo }) {
  console.log(listData);
  const onDragEnd = async ({ destination, source }) => {
    if (!destination) return;

    let listCopy = JSON.parse(JSON.stringify(listData));

    const sourceList = listCopy.find((list) => list.id === source.droppableId);
    const destinationList = listCopy.find(
      (list) => list.id === destination.droppableId
    );

    // const sourceTaskId = sourceList.Tasks.find(
    //   (task) => task.order === source.index
    // ).id;

    const dIndex = destinationList.Tasks.findIndex(
      (task) => task.order === destination.index
    );

    const sTaskIndex = sourceList.Tasks.findIndex(
      (task) => task.order === source.index
    );
    const dListIndex = listCopy.findIndex(
      (list) => list.id === destination.droppableId
    );
    const sListIndex = listCopy.findIndex(
      (list) => list.id === source.droppableId
    );

    const dTasks = listCopy[dListIndex].Tasks;

    const order = getOrder(dTasks, dIndex);

    let task = sourceList.Tasks[sTaskIndex];
    task.order = order;

    //moveTask parameters:
    //list, dListIndex, sListIndex, dTaskIndex, sTaskIndex, task
    const editedList = moveTask(
      listCopy,
      dListIndex,
      sListIndex,
      dIndex,
      sTaskIndex,
      task
    );
    setListData(editedList);

    //change order in database
    const URL = `/tasks/${task.id}/${destination.droppableId}/${order}`;
    await axios.patch(URL);
    // getUserInfo();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result);
        }}
      >
        {listData.map((list) => {
          return <List list={list} getUserInfo={getUserInfo}></List>;
        })}
      </DragDropContext>
    </div>
  );
}

export default Board;
