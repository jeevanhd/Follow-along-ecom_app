const { default: mongoose } = require("mongoose");
const UserModel = require("../Model/user.model.js");
const orderModel = require("../Model/order.model.js");

const createOrderController = async (req, res) => {
  const userId = req.userId;
  const { Items, address, totalAmount } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "Invalid user id", success: false });
    }

    const checkUser = await UserModel.findById(userId);
    if (!checkUser) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    if (!Items || Items.length === 0) { 
      return res
        .status(400)
        .json({ message: "Items are required", success: false });
    }

    const order = await orderModel.create({
      user: userId,
      OrderItems: Items,
      shippingAddress: address,
      totalAmount: totalAmount,
    });

    return res
      .status(201)
      .send({ message: "Order successfully Created", success: true, order });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const getUserOrderController = async (req, res) => {
  const userId = req.userId;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ message: "inValid user id", success: false });
    }

    const checkUser = await UserModel.findOne({ _id: userId });
    if (!checkUser) {
      return res.status(401).send({ message: "Please sign up" });
    }

    const order = await orderModel.find({ user: userId });
    if (!order || order.length === 0) { 
      return res.status(404).send({ message: "No orders found for this user." });
    }

    return res
      .status(200)
      .send({ message: "Data Fetched successfully", success: true, order });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createOrderController,
  getUserOrderController,
};
