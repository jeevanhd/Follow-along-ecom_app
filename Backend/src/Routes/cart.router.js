const express = require("express");
const verifyUser = require("../Middlewares/jwt-verify");
const router = express.Router();
const {
  addToCartController,
  getCartProductController,
  deleteCartProductController,
} = require("../Controllers/cart.controller");

router.post("/add-to-cart", verifyUser, addToCartController);

router.get("/get-user-cart-data", verifyUser, getCartProductController);

router.delete("/delete-from-cart", verifyUser, deleteCartProductController
  
);

module.exports = router;
