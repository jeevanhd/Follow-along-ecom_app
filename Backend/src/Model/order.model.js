const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    OrderItems: [
      { type: mongoose.Types.ObjectId, ref: "Product", require: true },
    ],
    shippingAddress: {
      country: { type: String, require: true },
      city: { type: String, require: true },
      address1: { type: String, require: true },
      address2: { type: String },
      zipCode: { type: Number, require: true },
      addressType: { type: String, require: true },
    },
    totalAmount: { type: Number, require: true, default: 0 },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
