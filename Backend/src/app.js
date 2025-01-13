const express = require("express");
const cors = require("cors");
const userRouter = require("./Routes/user.route.js");
const productRouter = require("./Routes/product.route.js");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./src/config/.env",
  });
}

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.send("Welcome to backend");
});

app.use("/user", userRouter);
app.use("/product", productRouter);

module.exports = app;
