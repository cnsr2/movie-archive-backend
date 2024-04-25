const express = require("express");
const router = express.Router();
const {
  login,
  register,
} = require("../controllers/AuthController/AuthController.js");
const { forgetPassword } = require("../Utils/sendOtp.js");
const {
  getPopularMovies,
  getRobotSearchMovies,
  getSearchMovies,
} = require("../controllers/MovieController/index.js");

router.post("/login", login);
router.post("/register", register);
router.post("/forgetPassword", forgetPassword);
router.post("/getPopularMovies", getPopularMovies);
router.post("/getRobotSearchMovies", getRobotSearchMovies);
router.post("/getSearchMovies", getSearchMovies);

module.exports = router;
