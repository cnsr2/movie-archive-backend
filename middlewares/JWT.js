const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET, CRYPTO_SALT } = process.env;
const crypto = require("crypto");

const UserModel = require("../models/user.model");

const generateToken = (user) => {
  const payload = { user };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, JWT_SECRET, options);
  return token;
};

const authToken = async (req, res, next) => {
  const user = UserModel;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ message: "unautherized" });

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err)
      return res.status(403).json({ code: 403, message: "unautherized" });
    if ((payload?.user?.id || 0) == 0) {
      return res.status(403).json({ code: 403, message: "unautherized" });
    }

    user
      .findByPk(payload.user.id)
      .then((user) => {
        if (user != null) {
          req.user = user;
          next();
        } else {
          return res.status(403).json({ code: 403, message: "unauthorized" });
        }
      })
      .catch((err) => {
        return res.status(403).json({ code: 403, message: "unauthorized" });
      });
  });
};

const encryptPassword = (password) => {
  return crypto
    .createHmac("sha256", CRYPTO_SALT)
    .update(password)
    .digest("hex");
};

module.exports = { generateToken, encryptPassword, authToken };
