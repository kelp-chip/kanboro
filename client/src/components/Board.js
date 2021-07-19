import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import requests from "../requests";
import getOrder from "../helpers/getOrder";
import moveTask from "../helpers/moveTask";
import getMoveDetails from "../helpers/getMoveDetails";
import "../styles/Board.scss";

function Board({ listData, setListData, getUserInfo, userData, setShowTimer }) {
  const onDragEnd = async ({ destination, source }) => {
    if (!destination) return;
    let listCopy = JSON.parse(JSON.stringify(listData));
    const { sourceList, dIndex, sTaskIndex, dListIndex, sListIndex, dTasks } =
      getMoveDetails(destination, source, listCopy);

    const order = getOrder(dTasks, dIndex);

    let task = sourceList.Tasks[sTaskIndex];
    task.order = order;

    //save moved task in frontend for snappier response
    const editedList = moveTask(
      listCopy,
      dListIndex,
      sListIndex,
      dIndex,
      sTaskIndex,
      task
    );
    setListData(editedList);

    //save moved task in backend
    await requests.patchOrder(task.id, destination.droppableId, order);
  };

  return (
    <div className="board">
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result);
        }}
      >
        {listData.length > 0 &&
          listData.map((list, i) => {
            return (
              <List
                list={list}
                listData={listData}
                getUserInfo={getUserInfo}
                key={list.id}
                index={i}
                setListData={setListData}
                userData={userData}
                setShowTimer={setShowTimer}
              ></List>
            );
          })}
      </DragDropContext>
    </div>
  );
}

export default Board;
