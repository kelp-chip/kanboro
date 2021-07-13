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
    await axios.post("/tasks", { listId: list.id, name: taskName });
    await getUserInfo();
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
              {!addingTask && (
                <button onClick={openAddTaskForm}>add task</button>
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
                  <button type="submit">add task</button>
                  <button onClick={openAddTaskForm}>close</button>
                </form>
              )}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default List;
