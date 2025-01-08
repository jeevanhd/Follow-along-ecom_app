const multer = require("multer");
const upload = multer({ dest: "temp-uploads/" });
const express = require("express");
const router = express.Router();

const {
  createProductController,
  getProductDataController,
} = require("../Controllers/product.controller.js");

router.post(
  "/create-product",
  upload.array("files", 3),
  createProductController
);

router.get("/get-products", getProductDataController);

module.exports = router;
