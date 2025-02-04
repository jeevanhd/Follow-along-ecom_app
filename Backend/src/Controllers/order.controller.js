const { default: mongoose } = require("mongoose");
const OrderModel = require("../Model/order.model.js");
const UserModel = require("../Model/user.model.js");

const createOrder = async (req, res) => {
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

    if (!Items) {
      return res
        .status(400)
        .json({ message: "Items are required", success: false });
    }

    const order = await OrderModel.create({
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

module.exports = {
  createOrder,
};
