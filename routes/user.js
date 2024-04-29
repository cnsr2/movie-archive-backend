const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/JWT.js");
const { updateUserName } = require("../controllers/UserController/index.js");

router.post("/updateUserName", updateUserName);

module.exports = router;
