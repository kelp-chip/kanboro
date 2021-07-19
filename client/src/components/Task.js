import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import "../styles/Task.scss";
import requests from "../requests";

function Task({ task, index, listIndex, setListData, listData }) {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const deleteTask = async (e) => {
    const listCopy = JSON.parse(JSON.stringify(listData));
    listCopy[listIndex].Tasks.splice(index, 1);
    setListData(listCopy);
    await requests.deleteTask(task.id);
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
              <div className="task-btns-container">
                <button className="delete-button" onClick={deleteTask}>
                  <i class="fas fa-edit"></i>
                </button>
                <button className="delete-button" onClick={deleteTask}>
                  start task
                  {/* <i class="far fa-clock"></i> */}
                  {/* <i class="fas fa-stopwatch"></i> */}
                  {/* <img
                    src="https://img.icons8.com/officexs/2x/running-rabbit.png"
                    alt="timer-btn"
                    height="14px"
                  ></img> */}
                </button>
              </div>
            )}
          </div>
        );
      }}
    </Draggable>
  );
}

export default Task;
