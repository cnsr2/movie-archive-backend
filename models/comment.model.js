const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
});
const CommentModel = model("Comment", CommentSchema);

module.exports = CommentModel;
