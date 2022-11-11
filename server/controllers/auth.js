const userModel = require("../models/user");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 465, //465:ssl , 587 :tsl
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  host: "smtp.gmail.com",
  tls: {
    rejectUnauthorized: false,
  },
});

const Register = async (req, res, next) => {
  const { email, username, password } = req.body;

  let oldUser = await userModel.findOne({ email: email });

  if (oldUser) {
    return res.status(400).send({ message: "User already exists" });
  }

  let newUser = new userModel({
    email,
    username,
    password,
  });

  await newUser.save();

  transport
    .sendMail({
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Verify Your Email",
      text: "Verify your Email : http://localhost:3000/verify",
    })
    .then((responce) => {
      return res.send({
        message: "User Verified",
        id: newUser._id,
      });
    });

  //   return res.status(200).send({ message: "User created successfully" });
};

const Login = async (req, res, next) => {
  const { username, password } = req.body;

  let oldUser = await userModel.findOne({
    username: username,
    password: password,
  });

  if (!oldUser) {
    return res.status(404).send({ message: "Not Found" });
  }

  return res.send({ message: "success", id: oldUser._id });
};

module.exports = { Register, Login };
