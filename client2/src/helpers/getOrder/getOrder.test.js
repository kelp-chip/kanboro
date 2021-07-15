import getOrder from "./index";
import "@testing-library/jest-dom/extend-expect";

const tasks = [{ order: 100 }, { order: 250 }, { order: 900 }, { order: 1000 }];

const tasks2 = [{ order: 500 }, { order: 4000 }];

const noTasks = [];

test("returns correct order for middle insertion", () => {
  let order = getOrder(tasks, 1);
  expect(order).toBe(175);

  order = getOrder(tasks, 2);
  expect(order).toBe(575);

  order = getOrder(tasks2, 1);
  expect(order).toBe(2250);
});

test("returns correct order for end of list insertion", () => {
  let order = getOrder(tasks, -1);
  expect(order).toBe(1100);

  order = getOrder(tasks2, -1);
  expect(order).toBe(4100);
});

test("returns correct order for empty list insertion", () => {
  let order = getOrder(noTasks, -1);
  expect(order).toBe(100);
});

test("returns correct order for top of populated list insertion", () => {
  let order = getOrder(tasks, 0);
  expect(order).toBe(50);

  order = getOrder(tasks2, 0);
  expect(order).toBe(250);
});
