const UserModel = require("../Model/user.model.js");
const ErrorHandler = require("../utilities/errorhandler.js");
const transporter = require("../utilities/Sendmail.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("../utilities/cloudinary.js");
const fs = require("fs");
const mongoose = require("mongoose");

require("dotenv").config({
  path: "../config/.env",
});

const CreateUser = async (req, res) => {
  const { Name, email, password } = req.body;

  const CheckUserPresent = await UserModel.findOne({
    email: email,
  });

  if (CheckUserPresent) {
    const error = new ErrorHandler("Already Present in DB", 400);

    return res.status(404).send({
      message: error.message,
      status: error.statusCode,
      success: false,
    });
  }

  const newUser = new UserModel({
    Name: Name,
    email: email,
    password: password,
  });

  const data = {
    Name,
    email,
    password,
  };
  const token = generateToken(data);
  await transporter.sendMail({
    to: "jeevanhd1313@gmail.com",
    from: "jeevanhd1313@gmail.com",
    subject: "verification email from follow along project",
    text: "Text",
    html: `<h1>Hello world   http://localhost:5173/activation/${token} </h1>`,
  });

  await newUser.save();

  return res.send("User Created Successfully");
};

const generateToken = (data) => {
  const token = jwt.sign(
    { name: data.name, email: data.email, id: data.id },
    process.env.SECRET_KEY
  );
  return token;
};

const verifyUser = (token) => {
  const verify = jwt.verify(token, process.env.SECRET_KEY);
  if (verify) {
    return verify;
  } else {
    return false;
  }
};

const verifyUserController = async (req, res) => {
  const { token } = req.query;
  try {
    if (verifyUser(token)) {
      return res
        .status(200)
        .cookie("token", token)
        .json({ token, success: true });
    }
    return res.status(403).send({ message: "token expired" });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkUserPresentInDB = await UserModel.findOne({ email: email });
    if (checkUserPresentInDB) {
      return res.status(403).send({ message: "User already present" });
    }

    const imageAddress = await cloudinary.uploader
      .upload(req.file.path, {
        folder: "uploads",
      })
      .then((result) => {
        fs.unlinkSync(req.file.path);
        return result.url;
      });

    bcrypt.hash(password, 10, async function (err, hashedPassword) {
      try {
        if (err) {
          return res.status(403).send({ message: err.message });
        }
        await UserModel.create({
          Name: name,
          email,
          password: hashedPassword,
          avatar: {
            url: imageAddress,
            public_id: `${email}_public_id`,
          },
        });

        return res.status(201).send({ message: "User created successfully.." });
      } catch (er) {
        return res.status(500).send({ message: er.message });
      }
    });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUserPresentInDB = await UserModel.findOne({ email: email });

    if (!checkUserPresentInDB) {
      return res.status(404).send({ message: "User not found" });
    }

    bcrypt.compare(
      password,
      checkUserPresentInDB.password,
      function (err, result) {
        if (err) {
          return res.status(403).send({ message: err.message, success: false });
        }
        let data = {
          id: checkUserPresentInDB._id,
          email,
          password: checkUserPresentInDB.password,
        };
        const token = generateToken(data);

        return res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          })
          .send({
            message: "User logged in successfully..",
            success: true,
            token,
          });
      }
    );
  } catch (er) {
    return res.status(403).send({ message: er.message, success: false });
  }
};

const getUserData = async (req, res) => {
  const userId = req.UserId;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: "Invalid user id" });
    }

    const checkUserPresentInDB = await UserModel.findOne({ _id: userId });
    if (!checkUserPresentInDB) {
      return res
        .status(401)
        .send({ message: "please Signup, user not present" });
    }

    res.status(200).send({ data: checkUserPresentInDB });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const AddAddressController = async (req, res) => {
  const userId = req.UserId;
  const { city, country, address1, address2, zipCode, addressType } = req.body;
  try {
    const userFindOne = await UserModel.findOne({ _id: userId });

    if (!userFindOne) {
      return res
        .status(404)
        .send({ message: "user not found", success: false });
    }

    const userAddress = {
      country,
      city,
      address1,
      address2,
      zipCode,
      addressType,
    };

    userFindOne.address.push(userAddress);
    const response = await userFindOne.save();

    return res
      .status(201)
      .send({ message: "added successfully", success: true, response });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const GetAddressController = async (req, res) => {
  const userId = req.UserId;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: "Please login, un-Authorized" });
    }

    const checkUser = await UserModel.findOne({ _id: userId }, { address: 1 });
    if (!checkUser) {
      return res.status(401).send({ message: "Please signup" });
    }

    return res
      .status(200)
      .send({ userInfo: checkUser, message: "Success", status: true });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const DeleteAddController = async (req, res) => {
  const userId = req.UserId;
  const { id } = req.query;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({
        message: "Please login, un-Authorized",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(401).send({ message: "Invalid id" });
    }

    const checkIfUserPresent = await UserModel.findOne({ _id: userId });
    if (!checkIfUserPresent) {
      return res
        .status(401)
        .send({ message: "unAuthorized please signup", success: false });
    }

    const response = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { address: { _id: id } } },
      { new: true }
    );

    return res
      .status(201)
      .send({ message: "user Address Deleted", success: true, response });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

module.exports = {
  CreateUser,
  verifyUserController,
  signup,
  login,
  getUserData,
  AddAddressController,
  GetAddressController,
  DeleteAddController,
};
