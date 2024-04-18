const { DataTypes } = require("sequelize");
const { encryptPassword } = require("../middlewares/JWT");

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    nameSurname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    friendsUserName :{
      type: DataTypes.JSON,
      defaultValue: []
    }
  });

  return User;
};
