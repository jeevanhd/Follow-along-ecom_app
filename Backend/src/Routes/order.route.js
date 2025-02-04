const express = require("express");
const router = express.Router();
const VerifyToken = require("../Middlewares/jwt-verify");
const {
  createOrderController,
  getUserOrderController,
} = require("../Controllers/order.controller");

router.post("/confirm-order", VerifyToken, createOrderController);

router.get("/user-order-data", VerifyToken, getUserOrderController);

module.exports = router;
