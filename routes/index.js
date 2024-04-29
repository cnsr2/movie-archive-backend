const express = require("express");
const router = express.Router();
const {
  login,
  register,
} = require("../controllers/AuthController/index.js");
const { forgetPassword } = require("../Utils/sendOtp.js");

router.post("/login", login);
router.post("/register", register);
router.post("/forgetPassword", forgetPassword);

module.exports = router;
