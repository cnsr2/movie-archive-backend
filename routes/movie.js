const express = require("express");
const router = express.Router();

const {
    getPopularMovies,
    getRobotSearchMovies,
    getSearchMovies,
    getTrendMovies,
    getMovieDetailById,
} = require("../controllers/MovieController/index.js");

router.post("/getPopularMovies", getPopularMovies);
router.post("/getRobotSearchMovies", getRobotSearchMovies);
router.post("/getSearchMovies", getSearchMovies);
router.post("/getTrendMovies", getTrendMovies);
router.post("/getMovieDetailById", getMovieDetailById);

module.exports = router;
