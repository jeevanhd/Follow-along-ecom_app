const express = require("express");
const router = express.Router();
const verifyUser = require("../Middlewares/jwt-verify");
const {
  createOrderController,
  getUserOrderController,
  cancelOrderController,
} = require("../Controllers/order.controller");

router.post("/confirm-order", verifyUser, createOrderController);

router.get("/user-order-data", verifyUser, getUserOrderController);

router.patch("/cancel-order", verifyUser, cancelOrderController);

module.exports = router;
