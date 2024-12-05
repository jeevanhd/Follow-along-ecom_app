if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./src/Config/.env",
  });
}
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to backend amigo");
});

module.exports = app;
