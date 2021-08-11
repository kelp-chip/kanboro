import { Draggable } from "react-beautiful-dnd";
import taskRoutes from "api/taskRoutes";
import styles from "../styles/Task.module.scss";
import edit from "images/edit.svg";
import clock from "images/clock.svg";
import check from "images/check.svg";
import checked from "images/checked.svg";
import pop from "sounds/pop.mp3";

function Task({
  task,
  index,
  listIndex,
  setBoard,
  board,
  startTask,
  setToggleEditTask,
  finishTask,
}) {
  const popSound = new Audio(pop);

  const deleteTask = async () => {
    const boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[listIndex].Tasks.splice(index, 1);
    setBoard(boardCopy);
    await taskRoutes.deleteTask(task.id);
    popSound.play();
  };

  const editTask = async () => {
    await setToggleEditTask(false);
    await setToggleEditTask({ task, index, listIndex, setBoard, board });
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
          >
            <div className={styles.header}>
              <div className={styles.title}>{task.name}</div>
            </div>
            {task.notes && <div className={styles.notes}>{task.notes}</div>}
            <div className={styles.options}>
              <button className={styles.optionBtn}>
                <img
                  src={edit}
                  className={styles.edit}
                  alt="edit"
                  onClick={editTask}
                ></img>
              </button>
              <button onClick={deleteTask} className={styles.delete}>
                ✕
              </button>
              {task.intervals !== 0 && (
                <div className={styles.time}>
                  <button>
                    <img
                      src={clock}
                      className={styles.edit}
                      alt="clock"
                      onClick={(e) => startTask(e, index)}
                    ></img>
                  </button>
                  <span className={styles.intervals}>
                    {task.intervals_completed < task.intervals ? (
                      `${task.intervals_completed}/${task.intervals}`
                    ) : (
                      <button onClick={(e) => finishTask(e, index)}>
                        <img
                          src={listIndex === 2 ? checked : check}
                          className={styles.checkmark}
                          alt="check"
                        ></img>
                      </button>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Task;
