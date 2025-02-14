const mongoose = require("mongoose");

const file = {
  amount: { type: Number, required: true },
  isPayed: { type: Boolean, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  paidOrder: [{ type: mongoose.Types.ObjectId, ref: "Order", required: true }],
  razorpay: {
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    signature: { type: String, required: true },
  },
};

const paymentSchema = new mongoose.Schema(file, { versionKey: false });

const paymentModel = mongoose.model("payments", paymentSchema);

module.exports = paymentModel;
