import { Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useState } from "react";
import "../styles/Task.scss";

function Task({ task }) {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const deleteTask = async (e) => {
    // console.log(e.target.parentNode.getAttribute("data-rbd-draggable-id"));
    await axios.delete(`http://localhost:8000/tasks/${task.id}`);
  };
  return (
    <Draggable key={task.id} draggableId={task.id} index={task.order}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="taskbox"
            style={{
              userSelect: "none",
              backgroundColor: snapshot.isDragging && "white",
              border: snapshot.isDragging ? "pink" : "none",
              boxShadow:
                snapshot.isDragging && "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              ...provided.draggableProps.style,
            }}
            onMouseOver={() => setShowDeleteBtn(true)}
            onMouseLeave={() => setShowDeleteBtn(false)}
          >
            <div>{task.name}</div>
            <div>
              {task.intervals_completed}/{task.intervals}
            </div>
            {showDeleteBtn && (
              <button className="delete-button" onClick={deleteTask}>
                delete
              </button>
            )}
          </div>
        );
      }}
    </Draggable>
  );
}

export default Task;
