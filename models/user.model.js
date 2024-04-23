const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  nameSurname: {
    type: String,
    maxLength: 100,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  friendsUserName: {
    type: [String],
    default: [],
  },
});

const UserModel = model("User", UserSchema);

modules.export = UserModel;
