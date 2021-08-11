"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ List }) {
      // define association here
      this.hasMany(List, {
        foreignKey: "userId",
        onDelete: "cascade",
        hooks: true,
      });
    }
    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alarm_sound: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "chime",
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://image.flaticon.com/icons/png/512/149/149071.png",
      },
      background_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "https://image.flaticon.com/icons/png/512/149/149071.png",
      },
      interval_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 25,
      },
      short_break_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      long_break_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 15,
      },
      newUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
