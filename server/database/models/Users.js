module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
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
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Board, {
      onDelete: "cascade",
      foreignKey: "user_id",
    });
  };

  return User;
};
