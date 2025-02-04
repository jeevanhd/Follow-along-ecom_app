const UserModel = require("../Model/user.model.js");
const ErrorHandler = require("../utilities/errorhandler.js");
const transporter = require("../utilities/Sendmail.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

require("dotenv").config({
  path: "../config/.env",
});

const CreateUser = async (req, res) => {
  const users = req.body.users; // Expecting an array of user objects

  try {
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).send({ message: "Send valid users array" });
    }

    const createdUsers = await Promise.all(users.map(async (user) => {
      const { Name, email, password } = user;

      const CheckUserPresent = await UserModel.findOne({ email: email });
      if (CheckUserPresent) {
        throw new ErrorHandler("User already present in DB", 400);
      }

      const newUser = new UserModel({ Name, email, password });
      await newUser.save();

      const token = generateToken({ Name, email });
      await transporter.sendMail({
        to: email,
        from: "jeevanhd1313@gmail.com",
        subject: "Verification email from follow along project",
        html: `<h1>Hello world, activate your account at http://localhost:5173/activation/${token}</h1>`,
      });

      return newUser;
    }));

    return res.status(201).send({
      message: "Users created successfully",
      success: true,
      createdUsers,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
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
  const { token } = req.params;
  try {
    if (verifyUser(token)) {
      return res
        .status(200)
        .cookie("token", token)
        .json({ token, success: true });
    }
    return res.status(403).send({ message: "Token expired" });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
};

const signup = async (req, res) => {
  const users = req.body.users; // Expecting an array of user objects

  try {
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).send({ message: "Send valid users array" });
    }

    const createdUsers = await Promise.all(users.map(async (user) => {
      const { name, email, password } = user;
      let imageAddress = null;

      const checkUserPresentInDB = await UserModel.findOne({ email: email });
      if (checkUserPresentInDB) {
        throw new Error("User already present");
      }

      if (req.file) {
        imageAddress = await cloudinary.UploadStream.upload(req.file.path, {
          folder: "uploads",
        }).then((res) => {
          fs.unlinkSync(req.file.path);
          return res.url;
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await UserModel.create({
        Name: name,
        email,
        password: hashedPassword,
        avatar: imageAddress ? {
          url: imageAddress,
          public_id: `${email}_public_id`,
        } : null,
      });

      return { name, email };
    }));

    return res.status(201).send({ message: "Users created successfully", createdUsers });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUserPresentInDB = await UserModel.findOne({ email: email });

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

        return res.status(200).cookie("token", token).send({
          message: "User logged in successfully..",
          success: true,
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
  const userId = req.userId;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).send({ message: "Invalid user id" });
    }

    const checkUserPresentInDB = await UserModel.findOne({ _id: userId });
    if (!checkUserPresentInDB) {
      return res.status(401).send({ message: "please Signup" });
    }

    res.status(200).send({ data: checkUserPresentInDB });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const AddAddressController = async (req, res) => {
  const userId = req.userId;
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
  const userId = req.userId;
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

module.exports = {
  CreateUser,
  verifyUserController,
  signup,
  login,
  getUserData,
  AddAddressController,
  GetAddressController,
};
