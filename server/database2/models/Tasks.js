module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    intervals: {
      type: DataTypes.INTEGER,
    },
    intervals_completed: {
      type: DataTypes.INTEGER,
    },
  });

  // Task.associate = (models) => {
  //   Task.belongsTo(models.List, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  return Task;
};
