const multer = require("multer");
const upload = multer({ dest: "temp-uploads/" });
const express = require("express");
const router = express.Router();
const verifyUser = require("../Middlewares/jwt-verify.js");

const {
  createProductController,
  getProductDataController,
  updateProductController,
  getSingleProductDocumentController,
  deleteSingleProductController,
} = require("../Controllers/product.controller.js");

router.post(
  "/create-product",
  upload.array("files", 3),
  verifyUser,
  createProductController
);

router.get("/get-products", getProductDataController);

router.put(
  "/update-product/:id",
  upload.array("files", 5),
  updateProductController
);

router.get("/get-single/:id", getSingleProductDocumentController);

router.delete("/:id", deleteSingleProductController);

module.exports = router;
