"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate({ User, Task }) {
      //create's foreign key using id from User
      this.hasMany(Task, {
        foreignKey: { name: "listId", allowNull: false },
        onDelete: "cascade",
        hooks: true,
      });
      this.belongsTo(User, { foreignKey: "userId" });
    }
  }

  List.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "List",
      tableName: "lists",
    }
  );

  return List;
};
