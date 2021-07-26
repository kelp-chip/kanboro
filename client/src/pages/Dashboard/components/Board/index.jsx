import { DragDropContext } from "react-beautiful-dnd";

export default function Board() {
  return (
    <div className="board">
      {/* <DragDropContext
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
      </DragDropContext> */}
    </div>
  );
}
