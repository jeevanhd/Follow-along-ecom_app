const express = require("express");
const multer = require("multer");
const {
  CreateUser,
  verifyUserController,
  signup,
  login,
} = require("../Controllers/user.controller.js");
const jwt = require("jsonwebtoken");
const upload = multer({ dest: "temp-uploads/" });
const router = express.Router();

router.post("/create-user", upload.single("file"), CreateUser);
router.get("/activation/:token", verifyUserController);

router.post("/signup", upload.single("file"), signup);
router.post("/login", login);

module.exports = router;
