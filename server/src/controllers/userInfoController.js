const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
// const UserInfo = require('../models/userInfoModel')

// local user storage
const users = [];

const generateToken = (userID) => jwt.sign({ userID }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

/**
 * @desc    Register new user
 * @route   POST /userInfo
 * @access  Public
 */
const getUserInfo = (req, res) => {
  res.send({});
};

const registerUser = asyncHandler(async (req, res) => {
  const {
    userID, password, email, gptAPIKey, firstName, lastName, profileImage,
  } = req.body;
  if (!userID || !email || !password) {
    res.status(400);
    throw new Error('Please add required fields');
  }

  // check user exists
  // const userExists = await UserInfo.findOne({email})
  const userExists = users.some((user) => user.email === email || user.userID === userID);
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user in MongoDB
  // const user = await UserInfo.create({
  //   User_ID: userID,
  //   Password: hashedPassword,
  //   Email: email,
  //   GPT_API_KEY: gptAPIKey,
  //   First_name: firstName,
  //   Last_name: lastName,
  // });
  const user = {
    userID, password: hashedPassword, email, gptAPIKey, firstName, lastName, profileImage,
  };
  const userCount = users.push(user);

  if (userCount) {
    res.status(201).json({
      userID: user.userID,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateToken(user.userID),
    });
  }

  res.status(400);
  throw new Error('invalid user data');
});

/**
 * @desc    Authenticate a user
 * @route   POST /userInfo/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  // const user = await User.findOne({ email });
  const user = users.find((u) => u.email === email);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      userID: user.userID,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: generateToken(user.userID),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

/**
 * @desc    Get user data
 * @route   GET /userInfo/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  const {
    userID, email, gptAPIKey, firstName, lastName, profileImage,
  } = users.find((u) => req.user.userID === u.userID);

  res.status(200).json({
    userID, email, gptAPIKey, firstName, lastName, profileImage,
  });
});

module.exports = {
  getUserInfo,
  loginUser,
  registerUser,
  getMe,
  users,
};
