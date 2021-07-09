module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define("List", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    order: {
      type: DataTypes.INTEGER,
    },
  });

  List.associate = (models) => {
    List.belongsTo(models.User, {
      foreignKey: "user_id",
    });

    List.hasMany(models.Task, {
      onDelete: "cascade",
    });
  };

  return List;
};
