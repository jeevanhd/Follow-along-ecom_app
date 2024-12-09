const { version } = require("mongoose");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: [true, "Please enter the name"] },
    email: {
      type: String,
      require: [true, "Please enter the email"],
      unique: [true, "Please enter unique"],
    },
    password: { type: String, require: [true, "Please enter the password"] },
    address: [
      { city: String },
      { country: String },
      { address1: String },
      { address2: String },
      { zipCode: String },
      { addressType: String },
    ],
    role: { type: String, default: "user" },
    avatar: {
      url: { type: String, require: true },
      public_id: { type: String, require: true },
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { versionKey: false }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
