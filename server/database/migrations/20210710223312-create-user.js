"use strict";
module.exports = {
  up: async (queryInterface, DataTypes) => {
    return queryInterface.createTable("users", {
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
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
      newUser: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable("users");
  },
};
