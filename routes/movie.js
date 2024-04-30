const express = require("express");
const router = express.Router();

const {
    getPopularMovies,
    getRobotSearchMovies,
    getSearchMovies,
    getTrendMovies,
    getMovieDetailById,
} = require("../controllers/MovieController/index.js");
const { addComment } = require("../controllers/CommentController/index.js");

router.post("/getPopularMovies", getPopularMovies);
router.post("/getRobotSearchMovies", getRobotSearchMovies);
router.post("/getSearchMovies", getSearchMovies);
router.post("/getTrendMovies", getTrendMovies);
router.post("/getMovieDetailById", getMovieDetailById);
router.post("/addComment", addComment);

module.exports = router;
