const asyncHandler = require('express-async-handler');
const UserProfile = require('../models/UserProfileModel');

/**
 * @desc    creturns a list of all the user profiles
 * @route   GET /userProfile
 * @access  Private
 */

// Dont' think we should give access to all user profiles
const getAllUserProfiles = asyncHandler(async (req, res) => {
  const allProfiles = await UserProfile.find({});
  if (!allProfiles) {
    res.status(400);
    throw new Error('No Profile found');
  }
  res.status(200).json(allProfiles);
});

/**
 * @desc    return the user profile with userID
 * @route   GET /userProfile/:userID
 * @access  Private
 */
const getUserProfileById = asyncHandler(async (req, res) => {
  const userProfile = await UserProfile.findOne({ userInfoID: req.user._id });
  if (!userProfile) {
    res.status(400);
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
  // check profile exists
  const profileExists = await UserProfile.findOne({ userInfoID: req.user._id });
  if (profileExists) {
    res.status(400).json({ message: 'Profile already exists' });
    throw new Error('Profile already exists');
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  const userProfile = req.body;
  if (!userProfile.birthday
      || !userProfile.experience
      || !userProfile.goals
      || !userProfile.apiKey
      || !userProfile.firstName
      || !userProfile.lastName) {
    res.status(400).json({ message: 'Please include all required fields' });
    throw new Error('Please include all required fields');
  }
  userProfile.userInfoID = req.user._id;
  const newProfile = await UserProfile.create(userProfile);
  if (newProfile) {
    res.status(201).json(newProfile);
  }
  res.status(400).json({ message: 'Failed to create profile' });
  throw new Error('Failed to create profile');
});

/**
 * @desc    update a user profile with userID
 * @route   PUT /userProfile/
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  // check profile exists
  const profileExists = await UserProfile.findOne({ userInfoID: req.user._id });
  if (!profileExists) {
    res.status(400).json({ message: 'Profile not found' });
    throw new Error('Profile not found');
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matches the profile user
  if (profileExists.userInfoID.toString() !== req.user._id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  const userProfile = req.body;
  if (!userProfile.birthday
      || !userProfile.experience
      || !userProfile.goals
      || !userProfile.apiKey
      || !userProfile.firstName
      || !userProfile.lastName) {
    res.status(400).json({ message: 'Please include all required fields' });
    throw new Error('Please include all required fields');
  }
  userProfile.userInfoID = req.user._id;
  const newProfile = await UserProfile.findOneAndUpdate(
    { userInfoID: req.user._id },
    userProfile,
    {
      new: true,
    },
  );
  if (newProfile) {
    res.status(201).json(newProfile);
  }
  res.status(400).json({ message: 'Failed to update profile' });
  throw new Error('Failed to update profile');
});

// May not use this, maybe profile should exist forever
/**
 * @desc    delete a user profile with userID
 * @route   DELETE /userProfile/
 * @access  Private
 */
const deleteUserProfileById = asyncHandler(async (req, res) => {
  // check profile exists
  const profileExists = await UserProfile.findOne({ userInfoID: req.user._id });
  if (!profileExists) {
    res.status(400).json({ message: 'Profile not found' });
    throw new Error('Profile not found');
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matches the profile user
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

module.exports = {
  getAllUserProfiles,
  getUserProfileById,
  createUserProfile,
  updateUserProfile,
  deleteUserProfileById,
};
