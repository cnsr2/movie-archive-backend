
const MovieModel = require("../../models/movie.model");
const CommentModel = require("../../models/comment.model");
const mongoose = require('mongoose');

const addComment = async (req, res) => {
    try {
        const { userName, description, movieId, like } = req.body;
        const searchMovie = await MovieModel.findOne({ movieId })
        const newComment = new CommentModel({
            userName,
            description,
            movieId
        });
        await newComment.save();
        if (!searchMovie) {
            const searchMovie = new MovieModel({
                movieId,
                commentIds: [newComment.id],
                like: 0,
            })
            await searchMovie.save();
        } else {
            if (like) {
                searchMovie.like += 1;
                await searchMovie.save();
            }
            searchMovie.commentIds.push(newComment.id);
            await searchMovie.save();
        }

        return res.status(200).json({ newComment })
    } catch (error) {
        res.status(400).json({
            message: "An error occurred while retrieving data",
            error: error.message,
        });
    }
}

const getCommentsByMovieId = async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await MovieModel.findOne({ movieId: movieId });
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const commentIds = movie.commentIds.map(id => new mongoose.Types.ObjectId(id));

        const comments = [];
        for (const commentId of commentIds) {
            const comment = await CommentModel.findById(commentId);
            if (comment) {
                comments.push(comment);
            }
        }

        return res.status(200).json({ movie, comments });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
}

module.exports = {
    addComment,
    getCommentsByMovieId
};
