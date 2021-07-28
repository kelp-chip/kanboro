import styles from "../styles/Form.module.scss";
import { useState } from "react";

export default function EditTaskForm({
  setToggleEditTask,
  taskData,
  editTask,
}) {
  const [taskName, setTaskName] = useState(taskData.task.name);
  const [intervals, setIntervals] = useState(taskData.task.intervals);

  return (
    <div>
      edit task
      <form
        className={styles.form}
        onSubmit={(e) =>
          editTask(e, taskData.task.id, taskData.index, taskName, intervals)
        }
      >
        <div className={styles.inputContainer}>
          <input
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
            type="number"
            min="0"
            max="20"
            value={intervals}
            onChange={(e) => setIntervals(e.target.value)}
          ></input>
        </div>

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
