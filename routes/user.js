const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/JWT.js");
const { updateUserName, addFriend } = require("../controllers/UserController/index.js");

router.post("/updateUserName", updateUserName);
router.post("/addFriend", addFriend);

module.exports = router;
