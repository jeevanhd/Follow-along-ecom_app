const express = require("express");
const router = express.Router();
const VerifyToken = require("../Middlewares/jwt-verify");
const { createOrder } = require("../Controllers/order.controller");

router.post("/confirm-order", VerifyToken, createOrder);

module.exports = router;
