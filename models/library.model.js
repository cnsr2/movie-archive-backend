const { Schema, model } = require("mongoose");

const LibrarySchema = new Schema({
  userId: {
    type: Number
  },
  watchedMoviesIds: {
    type: [String]
  },
  wantToWatchedMoviesIds: {
    type: [String]
  }
});
const LibraryModel = model("Library", LibrarySchema);

module.exports = LibraryModel;
