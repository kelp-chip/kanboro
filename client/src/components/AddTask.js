import React, { useRef, useEffect } from "react";

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
  //   const handleClickOutside = (event) => {
  //     console.log(wrapperRef.current);
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //       openAddTaskForm(false);
  //     }
  //   };

  useEffect(() => {
    document.addEventListener("mousedown", async (event) => {
      if (!addTaskForm.current.contains(event.target)) {
        await setAddingTask(false);
        await setTaskName("");
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={addTaskForm}>
      {!addingTask && (
        <button onClick={openAddTaskForm} className="add-btn">
          + add task
        </button>
      )}
      {addingTask && (
        <form onSubmit={addTask}>
          <div className="number-input-container">
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

          <div>
            <button type="submit">add task</button>
            <button onClick={openAddTaskForm} className="close">
              close
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddTask;
