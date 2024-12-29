const express = require("express");
const upload = require("../middlewares/multer.js");
const {
  CreateUSer,
  verifyUserController,
  signup,
  login,
} = require("../Controllers/user.controller.js");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/create-user", upload.single("file"), CreateUSer);
router.get("/activation/:token", verifyUserController);

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
