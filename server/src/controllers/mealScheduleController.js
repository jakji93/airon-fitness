const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const openAI = require('../utils/openaiUtil');
const MealSchedule = require('../models/MealScheduleModel');

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
    throw new Error('Meal schedule already exists');
  }

  // Generate the schedule
  const tempUser = {
    age: 25,
    sex: 'male',
    weight: '186',
    BMI: '23',
    fitness: 'high',
    healthConditions: 'asthma',
    height: '180',
    timePreference: '5 days per week',
    durationPreference: '60',
    equipmentAcess: 'dumbbells',
    goal: 'weight loss'
  }
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
