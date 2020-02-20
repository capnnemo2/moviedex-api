require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const moviedex = require("./moviedex.json");

const app = express();

app.use(morgan("dev"));

app.get("/movie", function handleGetMovie(req, res) {
  let response = moviedex;

  if (req.query.genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }

  if (req.query.country) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }

  if (req.query.avg_vote) {
    response = response.filter(movie => movie.avg_vote >= req.query.avg_vote);
  }

  res.json(response);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running at http:localhost:${PORT}`);
});
