import { DragDropContext } from "react-beautiful-dnd";

import List from "./List";

function Board({ listData, getUserInfo }) {
  const onDragEnd = ({ destination, source }) => {
    // if (!destination) return;

    // setListData(
    //   reorderTasks({
    //     listData,
    //     source,
    //     destination,
    //   })
    // );
    console.log(onDragEnd);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext>
        {listData.map((list) => {
          return <List list={list} getUserInfo={getUserInfo}></List>;
        })}
      </DragDropContext>
    </div>
  );
}

export default Board;
