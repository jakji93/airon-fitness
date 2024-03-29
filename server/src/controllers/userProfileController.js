const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const UserProfile = require('../models/UserProfileModel');
const WorkoutSchema = require('../models/WorkoutScheduleModel');
const MealSchedule = require('../models/MealScheduleModel');
const { USER_PROFILE_FIELDS } = require('../constants');
const openAI = require('../utils/openaiUtil');

/**
 * @desc    creturns a list of all the user profiles
 * @route   GET /userProfile
 * @access  Private
 */

/**
 * @desc    return the user profile with userID
 * @route   GET /userProfile/:userID
 * @access  Private
 */
const getUserProfileById = asyncHandler(async (req, res) => {
  const userProfile = await UserProfile.findOne({ userInfoID: req.user._id });
  if (!userProfile) {
    res.status(400).json({ message: 'Profile not found' });
    throw new Error('Profile not found');
  }
  res.status(200).json(userProfile);
});

/**
 * @desc    create a new user profile
 * @route   POST /userProfile
 * @access  Private
 */
const createUserProfile = asyncHandler(async (req, res) => {
  const profileExists = await UserProfile.findOne({ userInfoID: req.user._id });
  if (profileExists) {
    res.status(400).json({ message: 'Profile already exists' });
    throw new Error('Profile already exists');
  }
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  const userProfile = req.body;
  if (!userProfile.birthday
      || !userProfile.gender
      || !userProfile.experience
      || !userProfile.goals
      || !userProfile.apiKey
      || !userProfile.firstName
      || !userProfile.lastName
      || !userProfile.weight
      || !userProfile.weightUnit
      || !userProfile.height
      || !userProfile.heightUnit) {
    res.status(400).json({ message: 'Please include all required fields' });
    throw new Error('Please include all required fields');
  }
  const verifyKey = await openAI.verifyAPIKey(userProfile.apiKey);
  if (!verifyKey) {
    res.status(400).json({ message: 'Please include a valid GPT API key' });
    throw new Error('Please include a valid GPT API key');
  }
  userProfile.userInfoID = req.user._id;
  if (req.file) {
    userProfile.profileImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  }
  const newProfile = await UserProfile.create(userProfile);

  if (!newProfile) {
    res.status(400).json({ message: 'Failed to create profile' });
    throw new Error('Failed to create profile');
  }
  res.status(201).json(newProfile);
});

/**
 * @desc    update a user profile with userID
 * @route   PUT /userProfile/
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const profileExists = await UserProfile.findOne({ userInfoID: req.user._id });
  if (!profileExists) {
    res.status(400).json({ message: 'Profile not found' });
    throw new Error('Profile not found');
  }
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  if (profileExists.userInfoID.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const profile = Object.entries(profileExists._doc)
    .filter(([key]) => USER_PROFILE_FIELDS.includes(key))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  const userProfile = {
    ...profile,
    ...req.body,
  };
  if (!userProfile.birthday
    || !userProfile.gender
    || !userProfile.experience
    || !userProfile.goals
    || !userProfile.apiKey
    || !userProfile.firstName
    || !userProfile.lastName
    || !userProfile.weight
    || !userProfile.weightUnit
    || !userProfile.height
    || !userProfile.heightUnit) {
    res.status(400).json({ message: 'Please include all required fields' });
    throw new Error('Please include all required fields');
  }
  const verifyKey = await openAI.verifyAPIKey(userProfile.apiKey);
  if (!verifyKey) {
    res.status(400).json({ message: 'Please include a valid GPT API key' });
    throw new Error('Please include a valid GPT API key');
  }
  if (req.file) {
    userProfile.profileImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  }
  const updatedProfile = await UserProfile.findOneAndUpdate(
    { userInfoID: req.user._id },
    userProfile,
    {
      new: true,
    },
  );
  if (!updatedProfile) {
    res.status(400).json({ message: 'Failed to update profile' });
    throw new Error('Failed to update profile');
  }
  return res.status(201).json(updatedProfile);
});

/**
 * @desc    delete a user profile with userID
 * @route   DELETE /userProfile/
 * @access  Private
 */
const deleteUserProfileById = asyncHandler(async (req, res) => {
  const profileExists = await UserProfile.findOne({ userInfoID: req.user._id });
  if (!profileExists) {
    res.status(400).json({ message: 'Profile not found' });
    throw new Error('Profile not found');
  }
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  if (profileExists.userInfoID.toString() !== req.user._id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  const deletedProfile = await UserProfile.findOneAndDelete({ userInfoID: req.user._id });
  if (deletedProfile) {
    res.status(201).json(deletedProfile);
  }
  res.status(400).json({ message: 'Failed to delete profile' });
  throw new Error('Failed to delete profile');
});

const getPaginatedScheduleHistory = asyncHandler(async (req, res) => {
  const { page } = req.body;

  const docsPerPage = 6;
  const skip = page !== 0 ? docsPerPage * (page - 1) : 0;
  const query = { userInfoID: req.user._id };

  const countWorkouts = await WorkoutSchema.countDocuments(query);
  const countMeals = await MealSchedule.countDocuments(query);
  const totalPages = Math.ceil((countWorkouts + countMeals) / docsPerPage);

  const combinedSchedules = await WorkoutSchema.aggregate([
    { $unionWith: { coll: 'meals' } },
    { $match: { userInfoID: new mongoose.Types.ObjectId(req.user._id) } },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: docsPerPage },
  ]);

  res.status(200).json({
    pagination: {
      page,
      max: totalPages,
      schedules: combinedSchedules,
    },
  });
});

module.exports = {
  getUserProfileById,
  createUserProfile,
  updateUserProfile,
  deleteUserProfileById,
  getPaginatedScheduleHistory,
};
