const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "temp-uploads/" });
const verifyUser = require("../Middlewares/jwt-verify.js");

const {
  createProductController,
  getProductDataController,
  updateProductController,
  getSingleProductDocumentController,
  deleteSingleProductController,
} = require("../Controllers/product.controller.js");

router.get("/get-products", getProductDataController);
router.get("/get-single/", getSingleProductDocumentController);

router.post(
  "/create-product",
  [upload.array("files", 3), verifyUser],
  createProductController
);

router.put(
  "/update-product",
  upload.array("files", 5),
  updateProductController
);

router.delete("/", deleteSingleProductController);

module.exports = router;
