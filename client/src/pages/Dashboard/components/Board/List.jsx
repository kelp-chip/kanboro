import { Droppable } from "react-beautiful-dnd";
import { useState, useContext } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import moveTask from "helpers/moveTask";
import getOrder from "helpers/getOrder";
import taskRoutes from "api/taskRoutes";
import { UserContext } from "context/UserContext";
import styles from "../styles/List.module.scss";

function List({ list, board, index, setBoard, setTimer }) {
  const { user, setUser } = useContext(UserContext);
  const [addingTask, setAddingTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [intervals, setIntervals] = useState(0);

  const openAddTaskForm = async () => {
    if (addingTask) {
      await setAddingTask(false);
      await setTaskName("");
    } else setAddingTask(true);
  };

  const addUserTask = async (e) => {
    e.preventDefault();
    if (taskName === "") return;
    await taskRoutes.addTask(list.id, taskName, intervals);
    // await getUserInfo();
    await setTaskName("");
    await setAddingTask(false);
  };

  const startTask = async (taskIndex) => {
    //front end changes
    let boardCopy = JSON.parse(JSON.stringify(board));
    const task = boardCopy[index].Tasks[taskIndex];
    const order = await getOrder(boardCopy[1].Tasks, 0);
    task.order = order;
    const editedList = moveTask(boardCopy, 1, index, 0, taskIndex, task);
    await setBoard(editedList);
    console.log(user);

    //backend changes
    await taskRoutes.patchOrder(task.id, boardCopy[1].id, order);

    await setTimer(`${user.intervalTime}:00`);
  };

  return (
    <div
      key={list.id}
      className={styles.container}
      // style={{ alignText: "center", margin: "10px" }}
    >
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.list}
              style={{
                // background: snapshot.isDraggingOver && "rgb(184, 226, 251)",
                background: snapshot.isDraggingOver && "rgb(215, 236, 250)",
                // background: snapshot.isDraggingOver && "rgb(229, 188, 160)",
              }}
            >
              <h3>{list.name}</h3>
              {list.Tasks.map((task, i) => {
                return (
                  <Task
                    task={task}
                    index={i}
                    listIndex={index}
                    setBoard={setBoard}
                    board={board}
                    key={task.id}
                    startTask={startTask}
                  />
                );
              })}
              {provided.placeholder}
              <div className={styles["list-option-btns"]}>
                <TaskForm
                  addingTask={addingTask}
                  openAddTaskForm={openAddTaskForm}
                  addTask={addUserTask}
                  taskName={taskName}
                  setTaskName={setTaskName}
                  setAddingTask={setAddingTask}
                  setIntervals={setIntervals}
                  intervals={intervals}
                />
                {list.name === "completed" && !addingTask && (
                  <button className={styles["clear-list-btn"]}>
                    clear list
                  </button>
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
