const express = require("express");
const { CreateUser, Verify } = require("../Controllers/user.controller.js");
const upload = require("../Middlewares/multer.js");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/create-user", upload.single("file"), CreateUser);
router.get("/activation/:token", Verify);

module.exports = router;
