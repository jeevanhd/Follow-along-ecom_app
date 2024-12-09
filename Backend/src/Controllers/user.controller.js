const UserModel = require("../Model/user.model.js");

export async function CreateUser(req, res) {
  const { Name, email, password } = req.body;

  const CheckUserPresent = await UserModel.findOne({
    email: email,
  });

  if (CheckUserPresent) {
    return res.send("user Already exist");
  }

  const newUser = new UserModel({
    Name: Name,
    email: email,
    password: password,
  });

  await newUser.save();

  return res.send("user Created Successfully");
}
