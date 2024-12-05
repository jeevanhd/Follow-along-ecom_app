if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "../Config/.env",
  });
}

require("dotenv").config();

const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(
        `Connected to database successfully: ${data.connection.host}`
      );
    })
    .catch((err) => {
      console.log("Database connection failed", err.message);
    });
};

module.exports = connectDatabase;
