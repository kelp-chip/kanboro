"use strict";

const { UUIDV4 } = require("sequelize");

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable("Tasks", {
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
        defaultValue: null,
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
      listId: {
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: "cascade",
        onUpdate: "cascade",
        hooks: true,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tasks");
  },
};
