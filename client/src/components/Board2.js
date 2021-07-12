import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Board({ listData, setListData }) {
  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    setListData(
      reorderQuoteMap({
        listData,
        source,
        destination,
      })
    );
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}></DragDropContext>
    </div>
  );
}

export default Board;
