const express = require("express");
const { CreateUser } = require("../Controllers/user.controller.js");
const { upload } = require("../Middlewares/multer.js");

const router = express.Router();

router.post("/create-user", upload.single("file"), CreateUser);

module.exports = router;
