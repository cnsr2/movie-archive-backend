const fetch = require("node-fetch");

const getPopularMovies = async (req, res) => {
  // LANG : tr-TR  en-US

  try {
    const { lang } = req.body;
    if (lang !== "tr-TR" && lang !== "en-US") {
      throw new Error("Language is error.");
    }
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=${lang}&page=1`;
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

    const englishCategories = [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 36,
        name: "History",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 10402,
        name: "Music",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 10770,
        name: "TV Movie",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
    ];

    const turkishCategories = [
      {
        id: 28,
        name: "Aksiyon",
      },
      {
        id: 12,
        name: "Macera",
      },
      {
        id: 16,
        name: "Animasyon",
      },
      {
        id: 35,
        name: "Komedi",
      },
      {
        id: 80,
        name: "Suç",
      },
      {
        id: 99,
        name: "Belgesel",
      },
      {
        id: 18,
        name: "Dram",
      },
      {
        id: 10751,
        name: "Aile",
      },
      {
        id: 14,
        name: "Fantastik",
      },
      {
        id: 36,
        name: "Tarih",
      },
      {
        id: 27,
        name: "Korku",
      },
      {
        id: 10402,
        name: "Müzik",
      },
      {
        id: 9648,
        name: "Gizem",
      },
      {
        id: 10749,
        name: "Romantik",
      },
      {
        id: 878,
        name: "Bilim-Kurgu",
      },
      {
        id: 10770,
        name: "TV film",
      },
      {
        id: 53,
        name: "Gerilim",
      },
      {
        id: 10752,
        name: "Savaş",
      },
      {
        id: 37,
        name: "Vahşi Batı",
      },
    ];

    if (lang === "tr-TR") {
      res.status(200).json({
        popularMovies,
        turkishCategories,
      });
    } else {
      res.status(200).json({
        popularMovies,
        englishCategories,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
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

module.exports = { getPopularMovies, getRobotSearchMovies, getSearchMovies };
