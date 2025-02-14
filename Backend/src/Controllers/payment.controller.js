const Razorpay = require("razorpay");
const paymentModel = require("../Model/payment.model.js");
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./src/config/.env",
  });
}

console.log({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const createOrder = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const orders = await instance.orders.create({
      amount: amount * 100,
      currency: currency,
    });
    if (!orders) {
      return res.status(500).json({ message: "Failed to create order" });
    }

    return res
      .status(201)
      .send({ message: "order created successfully", orders });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const payOrders = async (req, res) => {
  const userId = req.UserId;
  const {
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    amount,
    orderIds,
  } = req.body;

  const mappedIds = orderIds.map((ele) => new mongoose.Types.ObjectId(ele._id));

  try {
    await paymentModel.create({
      isPayed: true,
      user: userId,
      amount: amount,
      paidOrder: mappedIds,
      razorpay: {
        paymentId: razorpayPaymentId,
        orderId: razorpayOrderId,
        signature: razorpaySignature,
      },
    });
    return res.status(201).send({ message: "Payment successful" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getKeys = async (req, res) => {
  try {
    return res.status(200).send({ key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { createOrder, payOrders, getKeys };
