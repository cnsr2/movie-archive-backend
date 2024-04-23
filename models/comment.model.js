const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
});
const CommentModel = model("Comment", CommentSchema);

modules.export = CommentModel;
