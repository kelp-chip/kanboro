import { Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import axios from "axios";
import Task from "./Task";
import "../styles/List.scss";

function List({ list, getUserInfo, getLists }) {
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
    if (taskName === "") return;
    await axios.post("/tasks", { listId: list.id, name: taskName });
    await getUserInfo();
    await setTaskName("");
    await setAddingTask(false);
  };

  return (
    <div
      key={list.id}
      className="list-container"
      // style={{ alignText: "center", margin: "10px" }}
    >
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="list"
              style={{
                // background: snapshot.isDraggingOver && "rgb(184, 226, 251)",
                background: snapshot.isDraggingOver && "rgb(215, 236, 250)",
                // background: snapshot.isDraggingOver && "rgb(229, 188, 160)",
              }}
            >
              <h3>{list.name}</h3>
              {list.Tasks.map((task) => {
                return <Task task={task} key={task.id} />;
              })}
              {provided.placeholder}
              <div>
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
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default List;
