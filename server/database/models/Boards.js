module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define("Board", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  });

  Board.associate = (models) => {
    Board.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    Board.hasMany(models.List, {
      onDelete: "cascade",
    });
  };

  return Board;
};
