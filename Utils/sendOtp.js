const UserModel = require("../models/user.model");
const OtpModel = require("../models/otp.model");
const { sendMail } = require("./Mailer");
const { encryptPassword } = require("../middlewares/JWT");

// mongoose.connect(process.env.DATABASE_URL);
const forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(404).json({ message: "Email Not Found" });
  }

  if (!req.body.code) {
    let code = "";

    code = Math.random().toString().split("").slice(2, 8).join("");

    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ mesage: "Email Not Found" });
    }
    await OtpModel.deleteOne({ userId: user.id });
    setTimeout(async () => {
      let tempOtp = await OtpModel.findOne({ userId: user.id });
      if (tempOtp) {
        await tempOtp.deleteOne();
        console.log("OTP expired and deleted.");
      }
    }, 5 * 60 * 1000);
    await OtpModel.create({
      userId: user.id,
      code,
    });
    await sendMail(
      email,
      "Password Reset Code",
      `Your Password Reset Code: ${code}`
    );
    return res.status(200).json({ message: "Password Sent" });
  }
  let user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ mesage: "Email Not Found" });
  }
  let otp = await OtpModel.findOne({ userId: user.id, code: req.body.code });
  if (otp) {
    let password = encryptPassword(req.body.password);
    await user.updateOne({ password });
    await otp.deleteOne();

    return res.status(200).json({ message: "Password updated successfully" });
  }

  return res.status(400).json({ message: "Invalid OTP" });
};

module.exports = { forgetPassword };
