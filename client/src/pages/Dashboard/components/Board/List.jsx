import { Droppable } from "react-beautiful-dnd";
import { useState, useContext } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import moveTask from "helpers/moveTask";
import getOrder from "helpers/getOrder";
import taskRoutes from "api/taskRoutes";
import { UserContext } from "context/UserContext";
import styles from "../styles/List.module.scss";
import listRoutes from "api/listRoutes";

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
    let task = await taskRoutes.addTask(list.id, taskName, intervals);
    let boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy[index].Tasks.push(task);
    await setBoard(boardCopy);
    await setTaskName("");
    await setAddingTask(false);
  };

  const startTask = async (e, taskIndex) => {
    //front end changes
    let boardCopy = JSON.parse(JSON.stringify(board));
    const task = boardCopy[index].Tasks[taskIndex];
    const order = await getOrder(boardCopy[1].Tasks, 0);
    task.order = order;
    const editedList = moveTask(boardCopy, 1, index, 0, taskIndex, task);
    await setBoard(editedList);
    await setTimer(true);

    // backend changes
    await taskRoutes.patchOrder(task.id, boardCopy[1].id, order);
  };

  return (
    <div key={list.id} className={styles.container}>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => {
          return (
            <div className={styles.wrapper}>
              <h3>{list.name}</h3>
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.list}
                style={{
                  background: snapshot.isDraggingOver && "rgb(215, 236, 250)",
                }}
              >
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
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default List;
