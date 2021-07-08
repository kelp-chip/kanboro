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
      type: DataTypes.STRING,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.List, {
      foreignKey: "list_id",
    });
  };

  return Task;
};
