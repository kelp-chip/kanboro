import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function Board({ listData, setListData }) {
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
      {console.log("---------LIST DATA-----------")}
      {console.log(listData)}
      <DragDropContext>
        {listData.map((list) => {
          return (
            <div key={list.id}>
              {/* temporary */}
              {/* ---------------------- */}
              <h3>id: {list.id}</h3>
              <h2>column.name: {list.name}</h2>
              {/* ---------------------- */}

              <Droppable droppableId={list.id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "cyan"
                          : "lightblue",
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      {list.Tasks.map((task) => {
                        return <h2 key={task.id}>{task.name}</h2>;
                      })}

                      {/* <Draggable
                        key={list.tasks[0].id}
                        draggableId={list.tasks[0].id}
                        index="1"
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {list.tasks[0].name}
                            </div>
                          );
                        }}
                      </Draggable> */}
                      {/* );
                      })} */}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Board;
