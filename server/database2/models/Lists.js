module.exports = (sequelize, DataTypes) => {
  const User = require("./Users");
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
    order: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,

      references: {
        // This is a reference to another model
        model: User,

        // This is the column name of the referenced model
        key: "id",
      },
    },
  });

  // List.associate = (models) => {
  //   //1 to many w/ Task
  //   // List.hasMany(models.Task, {
  //   //   foreignKey: "list_id",
  //   //   targetKey: "id",
  //   //   onDelete: "cascade",
  //   // });

  //   List.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  return List;
};
