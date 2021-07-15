import { Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { useState } from "react";
import "../styles/Task.scss";

function Task({ task, index, listIndex, setListData, listData }) {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const deleteTask = async (e) => {
    const listCopy = JSON.parse(JSON.stringify(listData));
    listCopy[listIndex].Tasks.splice(index, 1);
    setListData(listCopy);
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/tasks/${task.id}`);
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
              {task.intervals !== 0 && (
                <span
                  style={{
                    color:
                      task.intervals_completed === task.intervals
                        ? "green"
                        : "gray",
                  }}
                >
                  {task.intervals_completed}/{task.intervals}
                </span>
              )}
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
