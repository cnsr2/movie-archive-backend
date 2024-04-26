const { Schema, model } = require("mongoose");

const OtpSchema = new Schema({
  code: String,
  userId: String,
});
const OtpModel = model("Otp", OtpSchema);

module.exports = OtpModel;
