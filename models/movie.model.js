const { Schema, model } = require("mongoose");

const MovieSchema = new Schema({
  categories: [String],
  description: String,
  title: String,
  commentIds: [Number],
});
const MovieModel = model("Movie", MovieSchema);

modules.export = MovieModel;
