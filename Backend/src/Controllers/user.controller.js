const UserModel = require("../Model/user.model.js");
const ErrorHandler = require("../utilities/errorhandler.js");

async function CreateUser(req, res) {
  const { Name, email, password } = req.body;

  const CheckUserPresent = await UserModel.findOne({
    email: email,
  });

  if (CheckUserPresent) {
    return new ErrorHandler("user Already exist", 400);
  }

  const newUser = new UserModel({
    Name: Name,
    email: email,
    password: password,
  });

  await newUser.save();

  return res.send("user Created Successfully");
}

module.exports = CreateUser;
