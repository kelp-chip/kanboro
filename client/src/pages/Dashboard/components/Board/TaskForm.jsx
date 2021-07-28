import React, { useRef, useEffect } from "react";
import styles from "../styles/Form.module.scss";
function AddTask({
  addingTask,
  openAddTaskForm,
  setAddingTask,
  addTask,
  taskName,
  setTaskName,
  userData,
  setIntervals,
  intervals,
}) {
  const addTaskForm = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", async (event) => {
      if (addTaskForm.current && !addTaskForm.current.contains(event.target)) {
        await setAddingTask(false);
        await setTaskName("");
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={addTaskForm} className={styles.test}>
      {!addingTask && (
        <button onClick={openAddTaskForm} className={styles.clearBtn}>
          + add task
        </button>
      )}
      {addingTask && (
        <form onSubmit={addTask} className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              autoFocus
              className="task-name-input"
              type="text"
              value={taskName}
              placeholder="task name"
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
            ></input>
            <input
              className="number-input"
              type="number"
              min="0"
              max="20"
              value={intervals}
              onChange={(e) => setIntervals(e.target.value)}
            ></input>
          </div>
          <div className={styles.BtnContainer}>
            <button onClick={openAddTaskForm} className={styles.clearBtn}>
              close
            </button>
            <button type="submit" className={styles.Btn}>
              add task
            </button>
          </div>
          {/* </div> */}
        </form>
      )}
    </div>
  );
}

export default AddTask;
