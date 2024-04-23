const { Schema, model } = require("mongoose");

const LibrarySchema = new Schema({
  userId: Number,
  watchedMoviesIds: [String],
  wantToWatchedMoviesIds: [String],
});
const LibraryModel = model("Library", LibrarySchema);

modules.export = LibraryModel;
