"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ List }) {
      this.belongsTo(List, { foreignKey: "listId" });
    }
  }
  Task.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
      },
      intervals: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      intervals_completed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      order: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "tasks",
    }
  );
  return Task;
};
