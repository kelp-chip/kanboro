module.exports = {
  list1: () => {
    return [
      {
        Tasks: [{ id: "aaa" }, { id: "bbb" }, { id: "ccc" }],
      },
      {
        Tasks: [{ id: "ddd" }, { id: "eee" }],
      },
    ];
  },
  list2: () => {
    return [
      {
        Tasks: [],
      },
      {
        Tasks: [],
      },
      {
        Tasks: [{ id: "cats" }],
      },
    ];
  },
};
