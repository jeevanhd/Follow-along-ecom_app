const express = require("express");
const router = express.Router();
const upload = require("../Middlewares/multer.js");
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
  [upload.array("files"), verifyUser],
  createProductController
);

router.put("/update-product", upload.array("files"), updateProductController);

router.delete("/", deleteSingleProductController);

module.exports = router;
