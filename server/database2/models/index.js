const db = require("../connect");
const { DataTypes } = require("sequelize");
const users = require("./Users");
const lists = require("./Lists");
const tasks = require("./Tasks");

module.exports = {
  User: users(db, DataTypes),
  List: lists(db, DataTypes),
  Task: tasks(db, DataTypes),
};
