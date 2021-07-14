import React, { useRef, useEffect } from "react";

function AddTask({
  addingTask,
  openAddTaskForm,
  setAddingTask,
  addTask,
  taskName,
  setTaskName,
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
    // return () => {
    //   document.removeEventListener("click", () => setAddingTask(false));
    // };
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
          <input
            type="text"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          ></input>
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
