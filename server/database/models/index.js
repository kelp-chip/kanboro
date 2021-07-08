const db = require("../connect");
const { DataTypes } = require("sequelize");
const users = require("./Users");
const boards = require("./Boards");
const lists = require("./Lists");
const tasks = require("./Tasks");

module.exports = {
  users: users(db, DataTypes),
  boards: boards(db, DataTypes),
  lists: lists(db, DataTypes),
  tasks: tasks(db, DataTypes),
};
