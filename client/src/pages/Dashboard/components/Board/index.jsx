import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import taskRoutes from "api/taskRoutes";
import getOrder from "helpers/getOrder";
import moveTask from "helpers/moveTask";
import getMoveDetails from "helpers/getMoveDetails";
import styles from "../styles/Board.module.scss";

function Board({ board, setBoard, setTimer }) {
  const onDragEnd = async ({ destination, source }) => {
    if (!destination) return;
    let listCopy = JSON.parse(JSON.stringify(board));
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
    setBoard(editedList);
    await taskRoutes.patchTask({
      id: task.id,
      listId: destination.droppableId,
      order: order,
    });
  };

  return (
    <div className={styles.board}>
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result);
        }}
      >
        {board.length > 0 &&
          board.map((list, i) => {
            return (
              <List
                key={list.id}
                list={list}
                board={board}
                index={i}
                setBoard={setBoard}
                setTimer={setTimer}
              ></List>
            );
          })}
      </DragDropContext>
    </div>
  );
}

export default Board;
