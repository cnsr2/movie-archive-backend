const UserModel = require("../../models/user.model");

const { generateToken, encryptPassword } = require("../../middlewares/JWT");

const login = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
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

// const register = async (req, res) => {
//   try {
//     const { email, userName, password } = req.body;
//     const existingUser = await UserModel.findOne({ where: { userName } });

//     if (existingUser) {
//       if (existingUser.email === email) {
//         return res.status(400).json({ message: "Email already exists" });
//       } else {
//         return res.status(400).json({ message: "Username already exists" });
//       }
//     }
//     hashedPassword = await encryptPassword(password);
//     req.body.password = hashedPassword;

//     const newUser = new UserModel(req.body);
//     newUser.save();
//     // let tempUser = await UserModel.save(req.body);

//     return res.status(200).json({ newUser });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// };

const register = async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    const existingUser = await UserModel.findOne({ userName });

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
