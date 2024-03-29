const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const UserInfo = require('../models/UserInfoModel');
const UserProfile = require('../models/UserProfileModel');
const MealSchedule = require('../models/MealScheduleModel');
const WorkoutSchedule = require('../models/WorkoutScheduleModel');

const generateToken = (_id) => jwt.sign({ _id }, process.env.JWT_SECRET, {
  expiresIn: '30d',
});

/**
 * @desc registers a new user, returns authentication token
 * @route POST /userInfo
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const {
    password, email,
  } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: 'Please include an email and password' });
    throw new Error('Please include an email and password');
  }

  const userExists = await UserInfo.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserInfo.create({
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  }

  res.status(400).json({ message: 'invalid user data' });
  throw new Error('invalid user data');
});

/**
 * @desc    Authenticate a user
 * @route   POST /userInfo/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserInfo.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
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
    _id, email,
  } = await UserInfo.findOne({ _id: req.user._id });

  res.status(200).json({
    id: _id,
    email,
  });
});

/**
 * @desc    Delete user data
 * @route   DELETE /userInfo/me
 * @access  Private
 */
const deleteMe = asyncHandler(async (req, res) => {
  const {
    _id, email,
  } = await UserInfo.findOneAndDelete({ _id: req.user._id });

  if (!_id) {
    res.status(400).json({ message: 'User not found' });
    throw new Error('User not found');
  }

  await MealSchedule.deleteMany({ userInfoID: req.user._id });
  await WorkoutSchedule.deleteMany({ userInfoID: req.user._id });
  await UserProfile.deleteOne({ userInfoID: req.user._id });

  res.status(200).json({
    id: _id,
    email,
  });
});

module.exports = {
  loginUser,
  registerUser,
  getMe,
  deleteMe,
};
