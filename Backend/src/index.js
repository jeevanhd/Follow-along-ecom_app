if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./src/Config/.env",
  });
}

const connectDatabase = require("./DB/database.js");
const app = require("./app.js");
const port = process.env.PORT;

const server = app.listen(port, async () => {
  connectDatabase();
  console.log(`Server is running on ${port} url: https://localhost:8080`);
});
