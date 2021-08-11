import { Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import EditTaskForm from "./EditTaskForm";
import moveTask from "helpers/moveTask";
import getOrder from "helpers/getOrder";
import taskRoutes from "api/taskRoutes";
import click from "sounds/click.wav";
// import { UserContext } from "context/UserContext";
import styles from "../styles/List.module.scss";

function List({ list, board, index, setBoard, setTimer }) {
  // const { user, setUser } = useContext(UserContext);
  const [addingTask, setAddingTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [notes, setNotes] = useState("");
  const [intervals, setIntervals] = useState(0);
  const [toggleEditTask, setToggleEditTask] = useState(false);
  const [clickSound] = useState(new Audio(click));

  const openAddTaskForm = async () => {
    await setTaskName("");
    await setNotes("");
    await setAddingTask(true);
  };

  const editTask = async (
    e,
    taskId,
    taskIndex,
    editedTaskName,
    editedIntervals,
    notes
  ) => {
    e.preventDefault();
    let boardCopy = JSON.parse(JSON.stringify(board));
    const { task } = await taskRoutes.patchTask({
      id: taskId,
      name: editedTaskName,
      intervals: editedIntervals,
      notes: notes,
    });
    boardCopy[index].Tasks[taskIndex] = task;
    await setBoard(boardCopy);
    await setToggleEditTask(false);
  };

  const addUserTask = async (e) => {
    e.preventDefault();
    if (taskName === "") return;
    let task = await taskRoutes.addTask(list.id, taskName, intervals, notes);
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
    task.listId = boardCopy[1].id;
    const editedList = moveTask(boardCopy, 1, index, 0, taskIndex, task);
    await clickSound.play();
    await setBoard(editedList);
    await setTimer(true);

    // backend changes
    await taskRoutes.patchTask(task);
  };

  const finishTask = async (e, taskIndex) => {
    //front end changes
    let boardCopy = JSON.parse(JSON.stringify(board));
    const task = boardCopy[index].Tasks[taskIndex];
    const order = await getOrder(boardCopy[2].Tasks, 0);
    task.order = order;
    task.listId = boardCopy[2].id;
    const editedList = moveTask(boardCopy, 2, index, 0, taskIndex, task);
    await setBoard(editedList);

    // backend changes
    await taskRoutes.patchTask(task);
  };

  return (
    <div key={list.id} className={styles.container}>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => {
          return (
            <div className={styles.wrapper}>
              <div className={styles.listNameWrapper}>
                <h3 className={styles.listName}>{list.name}</h3>
              </div>
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.list}
                style={{
                  background: snapshot.isDraggingOver && "#efefef97",
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
                      finishTask={finishTask}
                      setToggleEditTask={setToggleEditTask}
                    />
                  );
                })}
                {provided.placeholder}
                {!!toggleEditTask ? (
                  <EditTaskForm
                    setToggleEditTask={setToggleEditTask}
                    taskData={toggleEditTask}
                    editTask={editTask}
                  />
                ) : (
                  <div className={styles["list-option-btns"]}>
                    {index !== 2 && (
                      <TaskForm
                        addingTask={addingTask}
                        openAddTaskForm={openAddTaskForm}
                        addTask={addUserTask}
                        taskName={taskName}
                        setTaskName={setTaskName}
                        setAddingTask={setAddingTask}
                        setIntervals={setIntervals}
                        intervals={intervals}
                        notes={notes}
                        setNotes={setNotes}
                      />
                    )}
                    {list.name === "completed" && !addingTask && (
                      <button
                        className={styles.clearListBtn}
                        style={{ color: list.length < 1 && "#e0e0e0" }}
                      >
                        clear list
                      </button>
                    )}
                  </div>
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
