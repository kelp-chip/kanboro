import moveTask from "./index";
import { list1, list2 } from "./mockData";
import "@testing-library/jest-dom/extend-expect";

describe("Move Task", function () {
  describe("moving task between other tasks", function () {
    test("moves task from one list to another", () => {
      let list = list1();
      let task = list[1].Tasks[1];

      //moveTask parameters:
      //list, dListIndex, sListIndex, dTaskIndex, sTaskIndex, task
      let newList = moveTask.move(list, 0, 1, 1, 1, task);

      expect(newList[0].Tasks.length).toBe(4);
      expect(newList[1].Tasks.length).toBe(1);
    });

    test("inserts correct task at correct index in destination list", () => {
      let list = list1();
      let task = list[1].Tasks[1];

      //moveTask parameters:
      //list, dListIndex, sListIndex, dTaskIndex, sTaskIndex, task
      let newList = moveTask.move(list, 0, 1, 1, 1, task);

      // console.log(newList);
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
      let newList = moveTask.move(list, 0, 1, 1, 1, task);

      let taskIndex = newList[1].Tasks.findIndex((id) => id === "eee");
      expect(taskIndex).toBe(-1);
    });
  });

  describe("moving task to empty list", function () {
    test("moves task from one list to another", () => {
      //adding to empty lists
      let list = list2();
      let task = list[2].Tasks[0];
      let newList = moveTask.move(list, 1, 2, 0, -1, task);
      expect(newList[1].Tasks.length).toBe(1);
      expect(newList[2].Tasks.length).toBe(0);

      list = list2();
      task = list[2].Tasks[0];
      newList = moveTask.move(list, 0, 2, 0, -1, task);
      expect(newList[0].Tasks.length).toBe(1);
      expect(newList[2].Tasks.length).toBe(0);
    });

    test("inserts correct task at correct index in destination list", () => {
      let list = list2();
      let task = list[2].Tasks[0];
      let newList = moveTask.move(list, 1, 2, 0, -1, task);

      let taskNewIndex = newList[1].Tasks.findIndex(
        (task) => task.id === "cats"
      );
      expect(taskNewIndex).toBe(0);
    });

    test("removes correct task from source list", () => {
      let list = list2();
      let task = list[2].Tasks[0];
      let newList = moveTask.move(list, 1, 2, 0, -1, task);

      let taskIndex = newList[2].Tasks.findIndex((task) => task.id === "cats");
      expect(taskIndex).toBe(-1);
    });
  });
});
