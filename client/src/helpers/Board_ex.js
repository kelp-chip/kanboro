import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const itemsFromBackend = [
//   { id: "2343", content: "Shower" },
//   { id: "123", content: "Clean Room" },
// ];

// const columnsFromBackend = {
//   backlog: {
//     name: "backlog",
//     items: itemsFromBackend,
//   },
//   progress: {
//     name: "in progress",
//     items: [],
//   },
//   done: {
//     name: "done",
//     items: [],
//   },
// };

const onDragEnd = (result, listData, setListData) => {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log("---------");
  console.log(destination);
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = listData[source.droppableId];
    const destColumn = listData[destination.droppableId];
    console.log(sourceColumn);
    console.log(destColumn);
    const sourceTasks = [...sourceColumn.tasks];
    const destTasks = [...destColumn.tasks];
    const [removed] = sourceTasks.splice(source.index, 1);
    console.log(destTasks);
    destTasks.splice(destination.index, 0, removed);
    console.log(destTasks);
    setListData({
      ...listData,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceTasks,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destTasks,
      },
    });
  }
  // } else {
  //   const column = listData[source.droppableId];
  //   const copiedItems = [...column.items];
  //   const [removed] = copiedItems.splice(source.index, 1);
  //   copiedItems.splice(destination.index, 0, removed);
  //   setListData({
  //     ...listData,
  //     [source.droppableId]: {
  //       ...column,
  //       tasks: copiedItems,
  //     },
  //   });
  // }
};
// const onDragEnd = (result, column, setColumnData) => {
//   if (!result.destination) return;
//   const { source, destination } = result;
//   if (source.droppableId !== destination.droppableId) {
//     const sourceColumn = column[source.droppableId];
//     const destColumn = column[destination.droppableId];
//     const sourceItems = [...sourceColumn.task];
//     const destItems = [...destColumn.items];
//     const [removed] = sourceItems.splice(source.index, 1);
//     destItems.splice(destination.index, 0, removed);
//     setColumnData({
//       ...column,
//       [source.droppableId]: {
//         ...sourceColumn,
//         items: sourceItems,
//       },
//       [destination.droppableId]: {
//         ...destColumn,
//         items: destItems,
//       },
//     });
//   } else {
//     const column = listData[source.droppableId];
//     const copiedItems = [...column.items];
//     const [removed] = copiedItems.splice(source.index, 1);
//     copiedItems.splice(destination.index, 0, removed);
//     setColumnData({
//       ...listData,
//       [source.droppableId]: {
//         ...column,
//         tasks: copiedItems,
//       },
//     });
//   }
// };

function Board({ listData, setListData }) {
  return (
    <>
      <h1>BOARD</h1>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result, listData, setListData);
          }}
        >
          {Object.entries(listData).map(([id, column]) => {
            return (
              <div style={{ marginLeft: "10px" }} key={id}>
                <h2>{column.name}</h2>
                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgray",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.tasks.map((task, index) => {
                          return (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      marginBottom: "8px",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "green"
                                        : "lightcyan",
                                      color: "black",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {task.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default Board;
