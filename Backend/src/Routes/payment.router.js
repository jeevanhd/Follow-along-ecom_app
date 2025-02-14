const express = require("express");
const {
  createOrder,
  payOrders,
  getKeys,
} = require("../Controllers/payment.controller");
const router = express.Router();
const verifyUser = require("../Middlewares/jwt-verify.js");

router.post("/create-order", createOrder);
router.post("/pay-order", verifyUser, payOrders);

router.get("/get-razorpay-key", getKeys);

module.exports = router;
