const asyncHandler = require('express-async-handler');
const openAI = require('../utils/openaiUtil');
const userUtil = require('../utils/userUtil');
const MealSchedule = require('../models/MealScheduleModel');
const UserProfile = require('../models/UserProfileModel');

/**
 * @desc    get meal schedule for user (userID)
 * @route   GET /mealSchedule
 * @access  Private
 */
const getMealScheduleByUser = asyncHandler(async (req, res) => {
  const {
    userInfoID, schedule, inputs,
  } = await MealSchedule.findOne({ userInfoID: req.user._id });

  if (!schedule) {
    res.status(404).json({ message: 'Meal schedule not found' });
  } else {
    res.status(200).json({
      userInfoID,
      schedule,
      inputs,
    });
  }
});

/**
 * @desc    create meal schedule for user (userID)
 * @route   POST /mealSchedule
 * @access  Private
 */
const createMealScheduleForUser = asyncHandler(async (req, res) => {
  const id = req.user._id;

  // Check if user already has a meal schedule
  const mealScheduleExists = await MealSchedule.findOne({ userInfoID: id });
  if (mealScheduleExists) {
    res.status(400).json({ message: 'Meal schedule already exists' });
  }

  // Look up the profile of the user
  const userProfile = await UserProfile.findOne({ userInfoID: id });
  // Generate the schedule with OpenAI
  const userData = userUtil.generateUserObject(userProfile);
  const generatedSchedule = await openAI.generateMealSchedule(userData);

  // Create meal in MongoDB
  const mealSchedule = await MealSchedule.create({
    userInfoID: id,
    schedule: generatedSchedule,
    inputs: [],
  });

  if (mealSchedule) {
    res.status(201).json({
      userInfoID: mealSchedule.id,
      schedule: mealSchedule.schedule,
      inputs: mealSchedule.inputs,
    });
  } else {
    res.status(400).json({ message: 'invalid meal schedule data' });
  }
});

/**
 * @desc    update meal schedule for user (userID)
 * @route   PUT /mealSchedule
 * @access  Private
 */
const updateMealScheduleForUser = asyncHandler(async (req, res) => {
  const id = req.user._id;

  // Retrieve the meal schedule (fail if user does not have one already)
  const mealSchedule = await MealSchedule.findOne({ userInfoID: id });
  if (!mealSchedule) {
    res.status(404).json({ message: 'Cannot update a meal schedule that does not exist' });
  }

  // Organize the data necessary to adjust the schedule
  const schedule = JSON.stringify(mealSchedule.schedule);
  const updatedInputs = mealSchedule.inputs;
  updatedInputs.push(req.body.customInput);

  // Look up the profile of the user
  const userProfile = await UserProfile.findOne({ userInfoID: id });

  // Update the schedule with OpenAI
  const userData = userUtil.generateUserObject(userProfile);
  const updatedMealSchedule = await openAI.updateMealSchedule(userData, updatedInputs, schedule);

  // Update the MongoDB document
  mealSchedule.schedule = updatedMealSchedule;
  mealSchedule.inputs = updatedInputs;
  const savedMealSchedule = await mealSchedule.save();

  // Send updated result
  if (savedMealSchedule) {
    res.status(200).json({
      userInfoID: savedMealSchedule.id,
      schedule: savedMealSchedule.schedule,
      inputs: savedMealSchedule.inputs,
    });
  }
});

module.exports = {
  getMealScheduleByUser,
  createMealScheduleForUser,
  updateMealScheduleForUser,
};
