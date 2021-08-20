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
        defaultValue:
          "https://res.cloudinary.com/dli6sknqy/image/upload/v1629420726/kanboro/Screen_Shot_2021-08-19_at_8.13.25_PM_u5aayc.png",
      },
      background_url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://images.unsplash.com/photo-1615552713642-73c367c8915c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1681&q=80",
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
