const multer = require("multer");
const upload = multer({ dest: "temp-uploads/" });
const express = require("express");

const {
  createProductController,
} = require("../Controllers/product.controller.js");
const router = express.Router();

router.post(
  "./create-product",
  upload.array("files", 5),
  createProductController
);

module.exports = router;
