const { Schema, model } = require("mongoose");

const OtpSchema = new Schema({
  code: {
    type: String
  },
  userId: {
    type: String
  },
});
const OtpModel = model("Otp", OtpSchema);

module.exports = OtpModel;
