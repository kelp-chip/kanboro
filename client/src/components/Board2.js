import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import axios from "axios";
import getOrder from "../helpers/getOrder";

function Board({ listData, setListData, getUserInfo }) {
  console.log(listData);
  const onDragEnd = async ({ destination, source }) => {
    if (!destination) return;
    const sourceList = listData.find((list) => list.id === source.droppableId);
    const destinationList = listData.find(
      (list) => list.id === destination.droppableId
    );

    const sourceTaskId = sourceList.Tasks.find(
      (task) => task.order === source.index
    ).id;

    const dTaskIndex = destinationList.Tasks.findIndex(
      (task) => task.order === destination.index
    );
    const sTaskIndex = sourceList.Tasks.findIndex(
      (task) => task.order === source.index
    );
    const dListIndex = listData.findIndex(
      (list) => list.id === destination.droppableId
    );
    const sListIndex = listData.findIndex(
      (list) => list.id === source.droppableId
    );
    const order = getOrder;

    console.log(dTaskIndex);

    // let order;
    // if (dTaskIndex === 0) {
    //   order = destinationList.Tasks[dTaskIndex].order / 2;
    // } else if (dTaskIndex === -1) {
    //   if (destinationList.Tasks.length > 0) {
    //     let lastTaskOrderNum =
    //       destinationList.Tasks[destinationList.Tasks.length - 1].order;
    //     order = (Math.floor(lastTaskOrderNum / 100) + 1) * 100;
    //   } else {
    //     order = 100;
    //   }
    // } else {
    //   order =
    //     (destinationList.Tasks[dTaskIndex].order +
    //       destinationList.Tasks[dTaskIndex - 1].order) /
    //     2;
    // }

    // //change order locally
    // let editListData = [...listData];
    // //add task to destination list
    // console.log("=======dListIndex==========");
    // console.log(dListIndex);
    // const task = listData[sListIndex].Tasks[sTaskIndex];
    // task.order = order;
    // editListData[sListIndex].Tasks.splice(sTaskIndex, 1);
    // if (dListIndex === -1) {
    //   editListData[dListIndex].Tasks.splice(
    //     editListData[dListIndex].Tasks.length + 1,
    //     0,
    //     task
    //   );
    // } else if (dListIndex === 0) {
    //   editListData[dListIndex].Tasks.push(task);
    // } else {
    //   console.log("HEYYYY");
    //   editListData[dListIndex].Tasks.splice(dTaskIndex, 0, task);
    // }
    // //remove from source list
    // await setListData(editListData);

    // //change order in database
    // const URL = `/tasks/${sourceTaskId}/${destination.droppableId}/${order}`;
    // await axios.patch(URL);
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
