import { Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import axios from "axios";
import Task from "./Task";

function List({ list, getUserInfo }) {
  const [addingTask, setAddingTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const openAddTaskForm = async () => {
    if (addingTask) {
      await setAddingTask(false);
      await setTaskName("");
    } else setAddingTask(true);
  };

  const addTask = async (e) => {
    e.preventDefault();
    await axios.post("/tasks", { listId: list.id, name: taskName });
    await getUserInfo();
  };

  return (
    <div key={list.id} style={{ alignText: "center", margin: "10px" }}>
      <h2>{list.name}</h2>

      <Droppable droppableId={list.id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              //   placeholder={provided.placeholder}
              style={{
                background: snapshot.isDraggingOver ? "LightCyan" : "lightblue",
                padding: 4,
                width: 250,
                minHeight: 500,
              }}
            >
              {list.Tasks.map((task) => {
                return <Task task={task} />;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      {!addingTask && <button onClick={openAddTaskForm}>add task</button>}
      {addingTask && (
        <form onSubmit={addTask}>
          <input
            type="text"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
          ></input>
          <button type="submit">add task</button>
          <button onClick={openAddTaskForm}>close</button>
        </form>
      )}
    </div>
  );
}

export default List;
