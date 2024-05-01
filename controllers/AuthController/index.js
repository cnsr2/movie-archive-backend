const UserModel = require("../../models/user.model");

const { generateToken, encryptPassword } = require("../../middlewares/JWT");

const login = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password are required" });
    }
    if (!email && !userName) {
      return res.status(400).json({ message: "Email or Username are required" });
    }
    let user;
    if (email) {
      user = await UserModel.findOne({ email });
    } else if (userName) {
      user = await UserModel.findOne({ userName });
    }

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    let encpw = encryptPassword(password);
    if (encpw == user.password) {
      let token = generateToken(user);
      return res.status(200).json({ token, user });
    }
    return res.status(404).json({
      message: "Wrong Password",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, userName, password, repassword } = req.body;
    if (!email || !userName || !password || !repassword) {
      return res.status(400).json({ message: "Email, Username, and password are required" });
    }
    if (password.length < 4) {
      return res.status(400).json({ message: "Password must be at least 4 characters long" });
    }
    if (password !== repassword) {
      return res.status(400).json({ message: "Password Doesn't Match" });
    }

    const existingUser = await UserModel.findOne({ $or: [{ userName }, { email }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        return res.status(400).json({ message: "Username already exists" });
      }
    }

    const hashedPassword = encryptPassword(password);
    const newUser = new UserModel({
      ...req.body,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(200).json({ newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = { login, register };
