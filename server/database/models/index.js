const db = require("../connect");
const { DataTypes } = require("sequelize");
const users = require("./Users");
const boards = require("./Boards");
const lists = require("./Lists");
const tasks = require("./Tasks");

module.exports = {
  User: users(db, DataTypes),
  Board: boards(db, DataTypes),
  List: lists(db, DataTypes),
  Task: tasks(db, DataTypes),
};
