import moveTask from "./index";
import { list1, list2 } from "./mockData";
import "@testing-library/jest-dom/extend-expect";

describe("Move Tasks", () => {
  describe("moving tasks between other tasks", () => {
    test("moves task from one list to another", () => {
      let list = list1();
      let task = list[1].Tasks[1];

      //moveTask parameters:
      //list, dListIndex, sListIndex, dTaskIndex, sTaskIndex, task
      let newList = moveTask(list, 0, 1, 1, 1, task);

      expect(newList[0].Tasks.length).toBe(4);
      expect(newList[1].Tasks.length).toBe(1);
    });

    test("inserts correct task at correct index in destination list", () => {
      let list = list1();
      let task = list[1].Tasks[1];

      //moveTask parameters:
      //list, dListIndex, sListIndex, dTaskIndex, sTaskIndex, task
      let newList = moveTask(list, 0, 1, 1, 1, task);

      let taskNewIndex = newList[0].Tasks.findIndex(
        (task) => task.id === "eee"
      );
      expect(taskNewIndex).toBe(1);
    });

    test("removes correct task from source list", () => {
      let list = list1();
      let task = list[1].Tasks[1];

      //moveTask parameters:
      //list, dListIndex, sListIndex, dTaskIndex, sTaskIndex, task
      let newList = moveTask(list, 0, 1, 1, 1, task);

      let taskIndex = newList[1].Tasks.findIndex((id) => id === "eee");
      expect(taskIndex).toBe(-1);
    });
  });

  describe("moving tasks to an empty list", () => {
    test("moves task from one list to another", () => {
      //adding to empty lists
      let list = list2();
      let task = list[2].Tasks[0];
      let newList = moveTask(list, 1, 2, 0, -1, task);
      expect(newList[1].Tasks.length).toBe(1);
      expect(newList[2].Tasks.length).toBe(0);

      list = list2();
      task = list[2].Tasks[0];
      newList = moveTask(list, 0, 2, 0, -1, task);
      expect(newList[0].Tasks.length).toBe(1);
      expect(newList[2].Tasks.length).toBe(0);
    });

    test("inserts correct task at correct index in destination list", () => {
      let list = list2();
      let task = list[2].Tasks[0];
      let newList = moveTask(list, 1, 2, 0, -1, task);

      let taskNewIndex = newList[1].Tasks.findIndex(
        (task) => task.id === "cats"
      );
      expect(taskNewIndex).toBe(0);
    });

    test("removes correct task from source list", () => {
      let list = list2();
      let task = list[2].Tasks[0];
      let newList = moveTask(list, 1, 2, 0, -1, task);

      let taskIndex = newList[2].Tasks.findIndex((task) => task.id === "cats");
      expect(taskIndex).toBe(-1);
    });
  });
  describe("moving tasks to top of lists", () => {
    test("inserts task to top of list correctly", () => {
      //moveTask parameters:
      //list, dListIndex, sListIndex, dIndex, sTaskIndex, task
      let list = list1();
      let task = list[0].Tasks[2];
      let newList = moveTask(list, 1, 0, 0, 2, task);

      let taskIndex = newList[1].Tasks.findIndex((task) => task.id === "ccc");
      expect(taskIndex).toBe(0);

      list = list1();
      task = list[1].Tasks[0];
      newList = moveTask(list, 0, 1, 0, 0, task);

      taskIndex = newList[0].Tasks.findIndex((task) => task.id === "ddd");
      expect(taskIndex).toBe(0);
    });

    test("moves task to top of same list correctly", () => {
      let list = list1();
      let task = list[0].Tasks[2];
      let newList = moveTask(list, 0, 0, 0, 2, task);

      let taskIndex = newList[0].Tasks.findIndex((task) => task.id === "ccc");
      expect(taskIndex).toBe(0);
    });
  });
  describe("moving tasks to bottom of lists", () => {
    test("inserts task to bottom of list correctly", () => {
      //Move task with id: "ccc" to bottom of the second list

      //moveTask parameters:
      //list, dListIndex, sListIndex, dIndex, sTaskIndex, task
      let list = list1();
      let task = list[0].Tasks[2];
      let newList = moveTask(list, 1, 0, -1, 2, task);

      let taskIndex = newList[1].Tasks.findIndex((task) => task.id === "ccc");
      expect(taskIndex).toBe(newList[1].Tasks.length - 1);

      //Move task with id: "ddd" to bottom of the first list

      list = list1();
      task = list[1].Tasks[0];
      newList = moveTask(list, 0, 1, -1, 0, task);

      taskIndex = newList[0].Tasks.findIndex((task) => task.id === "ddd");
      expect(taskIndex).toBe(newList[0].Tasks.length - 1);
    });

    test("moves task to bottom of same list correctly", () => {
      let list = list1();
      let task = list[0].Tasks[0];
      let newList = moveTask(list, 0, 0, -1, 0, task);

      let taskIndex = newList[0].Tasks.findIndex((task) => task.id === "aaa");
      expect(taskIndex).toBe(newList[0].Tasks.length - 1);
    });
  });
});
