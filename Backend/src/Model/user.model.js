const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: { type: String, require: [true, "Please Enter the Name..."] },
    email: {
      type: String,
      require: [true, "Please Enter Email.. "],
      unique: [true, "Please enter Unique Email Address"],
    },
    password: {
      type: String,
      require: [true, "Please enter the password..."],
    },
    address: [
      {
        country: { type: String },
        city: { type: String },
        address1: { type: String },
        address2: { type: String },
        zipCode: { type: Number },
        addressType: { type: String },
      },
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

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
