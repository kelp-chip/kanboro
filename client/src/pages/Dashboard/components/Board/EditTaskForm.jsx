import styles from "../styles/Form.module.scss";
import { useState, useEffect } from "react";

export default function EditTaskForm({
  setToggleEditTask,
  taskData,
  editTask,
}) {
  const [taskName, setTaskName] = useState(taskData.task.name);
  const [intervals, setIntervals] = useState(taskData.task.intervals);
  const [notes, setNotes] = useState(taskData.task.notes);

  // useEffect(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // }, []);
  return (
    <div>
      {console.log(taskData.task)}
      <form
        className={styles.form}
        onSubmit={(e) =>
          editTask(
            e,
            taskData.task.id,
            taskData.index,
            taskName,
            intervals,
            notes
          )
        }
      >
        <h3 className={styles.formName}>Edit Task</h3>
        <div className={styles.gridContainer}>
          <label for="taskName">task name</label>
          <label for="intervals">intervals</label>
        </div>
        <div className={styles.gridContainer}>
          <input
            name="taskName"
            autoFocus
            className="task-name-input"
            type="text"
            placeholder="task name"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          ></input>
          <input
            className="number-input"
            name="intervals"
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
            className={styles.clearBtn}
            onClick={() => setToggleEditTask(null)}
          >
            cancel
          </button>
          <button type="submit" className={styles.Btn}>
            save changes
          </button>
        </div>
      </form>
    </div>
  );
}
