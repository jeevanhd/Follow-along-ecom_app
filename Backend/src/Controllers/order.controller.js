const { mongoose } = require("mongoose");
const UserModel = require("../Model/user.model.js");
const OrderModel = require("../Model/order.model.js");
const CartModel = require("../Model/cart.model.js");

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

    const order = Items.map(async (ele) => {
      return await OrderModel.create({
        user: userId,
        orderItems: ele.productId._id,
        shippingAddress: address,
        totalAmount: totalAmount,
      });
    });
    await Promise.all(order);

    const ItemsMapped = Items.map(async (ele) => {
      return await CartModel.findByIdAndDelete({ _id: ele._id });
    });

    const checkDeletedItems = await Promise.all(ItemsMapped);

    return res.status(201).send({
      message: "Data successfully Fetched",
      success: true,
      checkDeletedItems,
    });
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

    const orders = await OrderModel.find(
      {
        user: userId,
        orderStatus: { $ne: "Cancelled" },
      },
      { orderStatus: 1, orderItems: 1 }
    ).populate("orderItems");

    return res.status(200).send({
      message: "Data Fetched successfully",
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const cancelOrderController = async (req, res) => {
  const userId = req.userId;
  const orderId = req.query.orderId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ message: "Invalid user id", success: false });
    }
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .send({ message: "Invalid user id", success: false });
    }

    await OrderModel.findByIdAndUpdate(
      { _id: orderId },
      {
        orderStatus: "Cancelled",
      },
      {
        new: true,
      }
    );

    return res.status(200).send({
      message: "Order Cancelled Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  createOrderController,
  getUserOrderController,
  cancelOrderController,
};
