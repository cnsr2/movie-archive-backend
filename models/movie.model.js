const { Schema, model } = require("mongoose");

const MovieSchema = new Schema({
  movieId: {
    type: Number,
    require: true
  },
  commentIds: {
    type: [String],
    default: []
  },
  like: {
    type: Number
  }
});
const MovieModel = model("Movie", MovieSchema);

module.exports = MovieModel;
