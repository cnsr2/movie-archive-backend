const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const indexRouter = require("./routes/index");
const movieRouter = require("./routes/movie");
const userRouter = require("./routes/user");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/api/", indexRouter);
app.use("/api/movies", movieRouter);
app.use("/api/user", userRouter);

const server = http.createServer(app);

const port = 3000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Veritabanı ile bağlantı kuruldu"))
  .catch((err) => {
    console.log("Hata!! veritabanına bağlanırken hata oldu.", err);
  });

server.listen(port, () => {
  console.log(`Server ${port} de çalıştı`);
});
