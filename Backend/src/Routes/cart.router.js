const express = require("express");
const router = express.Router();
const verifyUser = require("../Middlewares/jwt-verify");
const {
  addToCartController,
  getCartProductController,
} = require("../Controllers/cart.controller");

router.post("/add-to-cart", verifyUser, addToCartController);

router.get("/get-cart-data", verifyUser, getCartProductController);

module.exports = router;
