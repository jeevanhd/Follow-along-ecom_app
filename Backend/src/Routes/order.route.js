const express = require("express");
const router = express.Router();
const verifyUser = require("../Middlewares/jwt-verify");
const {
  createOrderController,
  getUserOrderController,
} = require("../Controllers/order.controller");

router.post("/confirm-order", verifyUser, createOrderController);

router.get("/user-order-data", verifyUser, getUserOrderController);

module.exports = router;
