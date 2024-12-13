if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./src/Config/.env",
  });
}
const express = require("express");
const userRouter = require("./Routes/user.route.js")

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to back ally amigo");
});
app.use("/user",userRouter)

module.exports = app;
