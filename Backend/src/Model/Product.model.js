const mongoose = require("mongoose");

const SchemaObject = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 1 },
  discountedPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  quantity: { type: Number, default: 1, required: true },
  category: {
    type: String,
    required: true,
    enum: ["male", "female", "kids"],
  },
  images: [
    {
      type: String,
      required: true,
      default: `https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081`,
    },
  ],
  userEmail: { type: String, required: true },
};

const ProductSchema = new mongoose.Schema(SchemaObject);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
