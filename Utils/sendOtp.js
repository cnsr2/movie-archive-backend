const db = require("../models");
const { sendMail } = require("./Mailer");
const { encryptPassword } = require("../middlewares/JWT");

const forgetPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(404).json({ message: "Email Not Found" });
  }

  if (!req.body.code) {
    let code = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let user = await db.user.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ mesage: "Email Not Found" });
    }
    await db.otp.destroy({ where: { userId: user.id } });
    setTimeout(async () => {
      let tempOtp = await db.otp.findOne({ where: { userId: user.id } });
      if (tempOtp) {
        await tempOtp.destroy();
        console.log("OTP expired and deleted.");
      }
    }, 5 * 60 * 1000);
    await db.otp.create({
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
  let user = await db.user.findOne({ where: { email: email } });
  if (!user) {
    return res.status(404).json({ mesage: "Email Not Found" });
  }
  let otp = await db.otp.findOne({
    where: { userId: user.id, code: req.body.code },
  });
  if (otp) {
    req.body.password = encryptPassword(req.body.password);
    await db.user.update(
      { password: req.body.password },
      { where: { email: email } }
    );
    await otp.destroy();
    return res.status(200).json({ message: "Password updated successfully" });
  }

  return res.status(400).json({ message: "Invalid OTP" });
};

module.exports = { forgetPassword };
