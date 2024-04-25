const db = require("../../models");
// const { Op } = require("sequelize");
const { generateToken, encryptPassword } = require("../../middlewares/JWT");

const login = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    let user;
    if (email) {
      user = await db.user.findOne({ where: { email } });
    } else if (userName) {
      user = await db.user.findOne({ where: { userName } });
    }

    if (!user) {
      return res.status(403).json({
        message: "User Not Found",
      });
    }

    let encpw = encryptPassword(password);
    if (encpw == user.password) {
      let token = generateToken(user);
      return res.status(200).json({ token, user });
    }
    return res.status(403).json({
      message: "Unauthorized",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const existingUser = await db.user.findOne({
      where: {
        [Op.or]: [{ email }, { userName }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        return res.status(400).json({ message: "Username already exists" });
      }
    }
    hashedPassword = await encryptPassword(password);
    req.body.password = hashedPassword;
    let tempUser = await db.user.create(req.body);

    return res.status(200).json({ tempUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = { login, register };
