const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tweet = require("../../models/Tweet");
require("dotenv").config();

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "5hr",
  });

  return token;
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const user = await User.create(req.body);
    const token = generateToken(user);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    // req.user
    const token = generateToken(req.user);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
