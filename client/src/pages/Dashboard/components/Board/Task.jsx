import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import taskRoutes from "api/taskRoutes";
import styles from "../styles/Task.module.scss";

function Task({
  task,
  index,
  listIndex,
  setBoard,
  board,
  startTask,
  setToggleEditTask,
}) {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const deleteTask = async (e) => {
    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[listIndex].Tasks.splice(index, 1);
    setBoard(boardCopy);
    await taskRoutes.deleteTask(task.id);
  };
  return (
    <Draggable key={task.id} draggableId={task.id} index={task.order}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.taskbox}
            style={{
              userSelect: "none",
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
              <div className={styles["task-btns-container"]}>
                {task.intervals > 0 && (
                  <button
                    className={styles["delete-button"]}
                    onClick={(e) => startTask(e, index)}
                  >
                    start task
                  </button>
                )}
                <button
                  className={styles["delete-button"]}
                  onClick={() => setToggleEditTask({ task, index })}
                >
                  edit
                </button>
                <button
                  className={styles["delete-button"]}
                  onClick={deleteTask}
                >
                  delete
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
