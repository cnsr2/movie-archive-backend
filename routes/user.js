const express = require("express");
const router = express.Router();
const { authToken } = require("../middlewares/JWT.js");
const { updateUserName, addFriend, updateEmail,updateNameSurname, updatePassword } = require("../controllers/UserController/index.js");

router.post("/updateUserName", updateUserName);
router.post("/updateNameSurname", updateNameSurname);
router.post("/updateEmail", updateEmail);
router.post("/addFriend", addFriend);
router.post("/updatePassword", updatePassword);

module.exports = router;