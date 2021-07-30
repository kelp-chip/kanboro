import React, { useRef, useEffect } from "react";
import styles from "../styles/Form.module.scss";
function AddTask({
  addingTask,
  openAddTaskForm,
  setAddingTask,
  addTask,
  taskName,
  setTaskName,
  setIntervals,
  intervals,
  notes,
  setNotes,
}) {
  const addTaskForm = useRef();
  useEffect(() => {
    // addTaskForm.current.scrollIntoView();
    document.addEventListener("mousedown", async (event) => {
      if (addTaskForm.current && !addTaskForm.current.contains(event.target)) {
        await setAddingTask(false);
        await setTaskName("");
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={addTaskForm} className={styles.container}>
      {!addingTask && (
        <button onClick={openAddTaskForm} className={styles.clearBtn}>
          + add task
        </button>
      )}
      {addingTask && (
        <form onSubmit={addTask} className={styles.form}>
          <h3 className={styles.formName}>Add Task</h3>
          <div className={styles.gridContainer}>
            <label>task name</label>
            <label>intervals</label>
          </div>
          <div className={styles.gridContainer}>
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
          <label for="notes">notes</label>
          <br />
          <textarea
            className={styles.notesInput}
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
          <div className={styles.BtnContainer}>
            <button
              onClick={() => setAddingTask(false)}
              className={styles.clearBtn}
            >
              close
            </button>
            <button type="submit" className={styles.Btn}>
              add task
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddTask;
