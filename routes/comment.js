const express = require("express");
const router = express.Router();

const { addComment, getCommentsByMovieId } = require("../controllers/CommentController/index.js");

router.get("/getByMovieId/:id", getCommentsByMovieId);
router.post("/add", addComment);


module.exports = router;
