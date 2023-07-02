const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const openAI = require('../utils/openaiUtil');
const ageUtil = require('../utils/ageUtil');
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
  const id = req.user._id;

  // Check if user already has a meal schedule
  const mealScheduleExists = await MealSchedule.findOne({ _userInfoID: id });
  if (mealScheduleExists) {
    res.status(400).json({ message: 'Meal schedule already exists' });
  }

  // Look up the profile of the user
  const userProfile = await UserProfile.findOne({ userInfoID: id });
  
  // Generate the schedule with OpenAI
  const userData = {
    age:                ageUtil.calculateAge(userProfile.birthday),
    gender:             userProfile.gender,
    height:             userProfile.height,
    heightUnit:         userProfile.heightUnit,
    weight:             userProfile.weight,
    weightUnit:         userProfile.weightUnit,
    experience:         userProfile.experience,
    bodyFat:            userProfile.bodyFat,
    muscleMass:         userProfile.muscleMass,
    exerciseDuration:   userProfile.duration,
    weeklyAvailability: userProfile.weeklyAvailability,
    allergies:          [...userProfile.allergies].join(','),
    preference:         [...userProfile.preference].join(','),
    equipment:          [...userProfile.equipment].join(','),
    goals:              [...userProfile.goals].join(','),
    healthConditions:   [...userProfile.healthConditions].join(','),
    dietRestrictions:   [...userProfile.dietRestriction].join(','),
  }
  const generatedSchedule = await openAI.generateMealSchedule(userData);

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
