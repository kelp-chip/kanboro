import { Draggable } from "react-beautiful-dnd";
function Task({ task }) {
  return (
    <Draggable key={task.id} draggableId={task.id} index={task.order}>
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
              backgroundColor: snapshot.isDragging ? "PowderBlue" : "white",
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
}

export default Task;
