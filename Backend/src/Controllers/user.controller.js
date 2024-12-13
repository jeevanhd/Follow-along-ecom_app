const UserModel = require("../Model/user.model.js");
const ErrorHandler = require("../utilities/errorhandler.js");
const transporter = require("../utilities/Sendmail.js");
const jwt = require("jsonwebtoken");

require("dotenv").config({
  path: "../Config/.env",
});

async function CreateUser(req, res) {
  const { Name, email, password } = req.body;

  const CheckUserPresent = await UserModel.findOne({
    email: email,
  });

  if (CheckUserPresent) {
    const error = new ErrorHandler("user Already exist", 400);

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
    to: "sandhyadinesh13@gmail.com",
    from: "jeevanhd1313@gmail.com",
    subject: "verification mail",
    text: "Text",
    html: `<h1>hello https://localhost:8080/activation.${token}</h1>`,
  });

  await newUser.save();

  return res.send("user Created Successfully");
}

const generateToken = (data) => {
  const token = jwt.sign(
    { name: data.name, email: data.email },
    process.env.SECRET_KEY
  );
};

async function Verify(req, res) {
  const { token } = req.params;
  try {
    if (verifyuser(token)) {
      return res
        .status(200)
        .cookie("token", token)
        .json({ token, success: true });
    }
    return res.status(403).send({ message: "token expried" });
  } catch (er) {
    return res.status(403).send({ message: er.message });
  }
}

const verifyuser = (token) => {
  const verify = jwt.verify(token, process.env.SECRET_KEY);
  if (verify) {
    return verify;
  } else {
    return false;
  }
};
module.exports = { CreateUser, Verify };
