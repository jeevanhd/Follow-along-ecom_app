const express = require("express");
const userRouter = require("./Routes/user.route.js");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./src/config/.env",
  });
}

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Welcome to backend");
});

app.use("/user", userRouter);

module.exports = app;
