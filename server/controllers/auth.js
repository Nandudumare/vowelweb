const userModel = require("../models/user");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465, //465:ssl , 587 :tsl
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  host: "smtp.gmail.com",
  tls: {
    rejectUnauthorized: false,
    secureProtocol: "TLSv1_method",
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
      text: `Verify your Email : http://localhost:3000/verify/${newUser._id}`,
    })
    .then((responce) => {
      return res.send({
        message: "Email Sent",
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
  if (oldUser.verified) {
    return res.send({ message: "success", id: oldUser._id });
  }

  return res.send({ message: "failed, not Verified", id: oldUser._id });
};

const verify = async (req, res) => {
  const { id } = req.body;

  const user = await userModel.findOne({ id });
  console.log("user:", user);

  if (user) {
    let update = await userModel.updateOne(
      { id },
      { $set: { verified: true } }
    );
    return res.send({ message: "user Verified" });
  }

  return res.status(400).send({ message: "Something went wrong" });
};

const getUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await userModel.findOne({ id });

  if (user) {
    return res.send(user);
  }

  return res.status(404).send({ message: "user not found" });
};

module.exports = { Register, Login, verify, getUser };
