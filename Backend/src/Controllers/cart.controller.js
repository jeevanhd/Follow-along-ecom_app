const mongoose = require("mongoose");
const UserModel = require("../Model/user.model");
const CartModel = require("../Model/cart.model");

const addToCartController = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.UserId;

  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).send({ message: "Send valid product id" });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .send({ message: "Send valid user id", success: false });
    }

    const checkUserPresent = await UserModel.findOne({ _id: userId });
    if (!checkUserPresent) {
      return res
        .status(401)
        .send({ message: "unAuthorized Please signup", success: false });
    }

    const checkProductPresent = await CartModel.findOne({
      productId: productId,
    });
    if (checkProductPresent) {
      return res
        .status(400)
        .send({ message: "Already present in cart", success: false });
    }

    const data = await CartModel.create({
      productId,
      quantity,
      userId,
    });

    return res
      .status(201)
      .send({
        message: "Product created successfully",
        success: true,
        data: data,
      });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

const getCartProductController = async (req, res) => {
  const userId = req.UserId;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: "unAuthorized user " });
    }

    const checkUserPresent = await UserModel.findOne({ _id: userId });
    if (!checkUserPresent) {
      return res.status(401).send({ message: "Un-Authorized Please signup" });
    }

    const data = await CartModel.find({ userId }).populate("productId");
    return res.status(200).send({
      message: "data successfully retrieved",
      success: true,
      cartData: data,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};

const deleteCartProductController = async (req, res) => {
  const productId = req.query.id;
  const userId = req.UserId;
  try {
    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(401).send({ message: "Invalid product or user id" });
    }

    const data = await CartModel.findOneAndDelete({
      productId: productId,
      userId: userId,
    });

    if (!data) {
      return res.status(404).send({ message: "Product not found in cart" });
    }

    return res.status(202).send({ message: "Deleted successfully", data });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

module.exports = {
  addToCartController,
  getCartProductController,
  deleteCartProductController,
};
