const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Library = sequelize.define("library", {
    watchedMoviesIds: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    wantToWatchedMoviesIds: {
      type: DataTypes.JSON,
      defaultValue: []
    },
  }
);

  return Library;
};
