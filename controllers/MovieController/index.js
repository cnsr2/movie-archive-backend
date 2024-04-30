const fetch = require("node-fetch");
const CategoryModel = require("../../models/category.model");
const MovieModel = require("../../models/movie.model");

const getPopularMovies = async (req, res) => {
  // LANG : tr-TR  en-US

  try {
    const { lang } = req.body;
    if (lang !== "tr-TR" && lang !== "en-US") {
      throw new Error("Language is error.");
    }
    const url = `https://api.themoviedb.org/3/movie/popular?language=${lang}&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGFjODhhY2I1ZDZhMWNhNzY2OTc1YmQ0ODAyNWE3YSIsInN1YiI6IjY1OTAzMTVhZjVmMWM1Nzc2NzAwODExOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EK8bnnAWdoBQKhknWlUvee82eSUsNOWds8y7qvpRrqk",
      },
    };
    const data = await fetch(url, options)
      .then((res) => res.json())
      .then((json) => json.results)
      .catch((err) => console.error("error:" + err));
    console.log(data);

    const popularMovies = data.map((movie) => {
      return {
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        id: movie.id,
      };
    });

    res.status(200).json({
      popularMovies,
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const getTrendMovies = async (req, res) => {
  try {
    const { lang } = req.body;

    const url = `https://api.themoviedb.org/3/trending/movie/week?language=${lang}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGFjODhhY2I1ZDZhMWNhNzY2OTc1YmQ0ODAyNWE3YSIsInN1YiI6IjY1OTAzMTVhZjVmMWM1Nzc2NzAwODExOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EK8bnnAWdoBQKhknWlUvee82eSUsNOWds8y7qvpRrqk",
      },
    };

    const trendMovies = await fetch(url, options)
      .then((res) => res.json())
      .then((json) =>
        json.results.slice(0, 4).map((movie) => {
          return {
            title: movie.title,
            id: movie.id,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        })
      )
      .catch((err) => console.error("error:" + err));

    const result = await CategoryModel.findOne({ lang });
    const categories = result.data;

    res.status(200).json({
      trendMovies,
      categories,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

const getRobotSearchMovies = async (req, res) => {
  try {
    const { lang, vote, genres, year } = req.body;
    if (lang !== "tr-TR" && lang !== "en-US") {
      throw new Error("Language is error.");
    }
    let genreString;

    if (genres.length === 1) {
      genreString = genres.join("");
    } else {
      genreString = genres.join("%2C");
    }

    const url = `https://api.themoviedb.org/3/discover/movie?include_video=false&language=${lang}&page=1&sort_by=popularity.desc&vote_average.gte=${vote}&with_genres=${genreString}&year=-${year}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGFjODhhY2I1ZDZhMWNhNzY2OTc1YmQ0ODAyNWE3YSIsInN1YiI6IjY1OTAzMTVhZjVmMWM1Nzc2NzAwODExOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EK8bnnAWdoBQKhknWlUvee82eSUsNOWds8y7qvpRrqk",
      },
    };

    const robotMovies = await fetch(url, options)
      .then((res) => res.json())
      .then((json) =>
        json.results.map((movie) => {
          return {
            title: movie.title,
            id: movie.id,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        })
      )
      .catch((err) => console.error("error:" + err));

    res.status(200).json({
      robotMovies,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

const getSearchMovies = async (req, res) => {
  try {
    const { lang, query } = req.body;
    if (lang !== "tr-TR" && lang !== "en-US") {
      throw new Error("Language is error.");
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=${lang}&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGFjODhhY2I1ZDZhMWNhNzY2OTc1YmQ0ODAyNWE3YSIsInN1YiI6IjY1OTAzMTVhZjVmMWM1Nzc2NzAwODExOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EK8bnnAWdoBQKhknWlUvee82eSUsNOWds8y7qvpRrqk",
      },
    };

    const searchMovies = await fetch(url, options)
      .then((res) => res.json())
      .then((json) =>
        json.results.map((movie) => {
          return {
            title: movie.title,
            id: movie.id,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        })
      )
      .catch((err) => console.error("error:" + err));

    res.status(200).json({
      searchMovies,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

const getMovieDetailById = async (req, res) => {
  try {
    const { lang, id } = req.body;

    const url = `https://api.themoviedb.org/3/movie/${id}?language=${lang}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGFjODhhY2I1ZDZhMWNhNzY2OTc1YmQ0ODAyNWE3YSIsInN1YiI6IjY1OTAzMTVhZjVmMWM1Nzc2NzAwODExOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EK8bnnAWdoBQKhknWlUvee82eSUsNOWds8y7qvpRrqk",
      },
    };

    const movieDetails = await fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        return {
          id: json.id,
          adult: json.adult,
          image: `https://image.tmdb.org/t/p/w500${json.poster_path}`,
          genres: json.genres,
          imdb: json.vote_average,
          overview: json.overview,
          original_title: json.original_title,
          release_date: json.release_date,
          runtime: json.runtime,
        }
      }
      )
      .catch((err) => console.error("error:" + err));



    res.status(200).json({
      movieDetails
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred while retrieving data",
      error: error.message,
    });
  }
};



module.exports = {
  getPopularMovies,
  getRobotSearchMovies,
  getSearchMovies,
  getTrendMovies,
  getMovieDetailById
};
