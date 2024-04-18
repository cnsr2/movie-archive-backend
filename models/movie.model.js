const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Movie = sequelize.define("movie", {
    categories: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    commentıds :{
      type: DataTypes.JSON,
      defaultValue: []
    }
  });

  return Movie;
};
