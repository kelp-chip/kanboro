import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import axios from "axios";
import getOrder from "../helpers/getOrder";
import moveTask from "../helpers/moveTask";
import getMoveDetails from "../helpers/getMoveDetails";
import "../styles/Board.scss";

function Board({ listData, setListData, getUserInfo }) {
  console.log(listData);
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
    const URL = `/tasks/${task.id}/${destination.droppableId}/${order}`;
    await axios.patch(URL);
  };

  return (
    <div className="board">
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result);
        }}
      >
        {listData.map((list) => {
          return (
            <List list={list} getUserInfo={getUserInfo} key={list.id}></List>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Board;
