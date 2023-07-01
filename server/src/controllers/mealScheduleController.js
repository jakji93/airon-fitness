const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const openAI = require('../utils/openaiUtil');
const MealSchedule = require('../models/MealScheduleModel');
const UserProfile = require('../models/UserProfileModel');

/**
 * @desc    get meal schedule for user (userID)
 * @route   GET /mealSchedule
 * @access  Private
 */
const getMealScheduleByUser = asyncHandler(async (req, res) => {
  const {
    _userInfoID, schedule, inputs
  } = await MealSchedule.findOne({ _userInfoID: req.user._id });

  if (!foundItem) {
    res.status(404).json({ message: 'Meal schedule not found' })
  } else {
    res.status(200).json({
      userInfoID: _userInfoID,
      schedule,
      inputs
    })
  }
});

/**
 * @desc    create meal schedule for user (userID)
 * @route   POST /mealSchedule
 * @access  Private
 */
const createMealScheduleForUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  const id = req.user._id;
  console.log(id);

  // Check if user already has a meal schedule
  const mealScheduleExists = await MealSchedule.findOne({ _userInfoID: id });
  console.log(mealScheduleExists);

  if (mealScheduleExists) {
    res.status(400).json({ message: 'Meal schedule already exists' });
    throw new Error('Meal schedule already exists');
  }

  // Look up the profile of the user
  const userProfile = await UserProfile.findOne({ userInfoID: id });
  console.log(userProfile);
  const tempUser = {
    age: userProfile.birthday,
    sex: userProfile.gender,
    weight: userProfile.weight,
    fitness: userProfile.experience,
    healthConditions: [...userProfile.healthConditions].join(','),
    height: userProfile.height,
    timePreference: userProfile.weeklyAvailability,
    durationPreference: userProfile.duration,
    equipmentAcess: userProfile.equipment,
    goal: [...userProfile.goals].join(','),
  }
  console.log(tempUser);
  const generatedSchedule = await openAI.generateMealSchedule(tempUser);

  // Create meal in MongoDB
  const mealSchedule = await MealSchedule.create({
    _userInfoID: id,
    schedule: generatedSchedule,
    inputs: [],
  });

  if (mealSchedule) {
    res.status(201).json({
      userInfoID: mealSchedule.id,
      schedule: mealSchedule.schedule,
      inputs: mealSchedule.inputs,
    })
  }

  res.status(400).json({ message: 'invalid meal schedule data' });
  throw new Error('invalid meal schedule data');
});

/**
 * @desc    update meal schedule for user (userID)
 * @route   PUT /mealSchedule
 * @access  Private
 */
const updateMealScheduleForUser = (req, res) => {

};

module.exports = {
  getMealScheduleByUser,
  createMealScheduleForUser,
  updateMealScheduleForUser,
};
