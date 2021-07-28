import { Draggable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import taskRoutes from "api/taskRoutes";
import styles from "../styles/Task.module.scss";
import edit from "images/edit.svg";
import clock from "images/clock.svg";

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
  const [taskChosen, setTaskChosen] = useState(false);
  const deleteTask = async (e) => {
    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[listIndex].Tasks.splice(index, 1);
    setBoard(boardCopy);
    await taskRoutes.deleteTask(task.id);
  };

  const editTask = async () => {
    await setToggleEditTask(false);
    await setToggleEditTask({ task, index });
    await window.scrollTo(0, document.body.scrollHeight);
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
            <div className={styles.header}>
              <div className={styles.title}>{task.name}</div>
            </div>
            {task.notes && <div className={styles.notes}>{task.notes}</div>}
            <div className={styles.options}>
              <img
                src={edit}
                className={styles.edit}
                alt="edit"
                onClick={editTask}
              ></img>

              {task.intervals !== 0 && (
                <div className={styles.time}>
                  <img
                    src={clock}
                    className={styles.edit}
                    alt="clock"
                    onClick={(e) => startTask(e, index)}
                  ></img>
                  <span
                    className={styles.intervals}
                    onClick={(e) => startTask(e, index)}
                  >
                    {task.intervals_completed}/{task.intervals}
                  </span>
                </div>
              )}
            </div>
            {/* {showDeleteBtn && (
              <div className={styles.taskBtnsContainer}>
                <img
                  src={clock}
                  className={styles.edit}
                  width="20px"
                  alt="clock"
                  onClick={(e) => startTask(e, index)}
                ></img>{" "}
                <img
                  src={edit}
                  className={styles.edit}
                  width="20px"
                  alt="edit"
                  onClick={() => setToggleEditTask({ task, index })}
                ></img>
              </div>
            )} */}
          </div>
        );
      }}
    </Draggable>
  );
}

export default Task;
