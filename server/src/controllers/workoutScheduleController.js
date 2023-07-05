const asyncHandler = require('express-async-handler');
const openAI = require('../utils/openaiUtil');
const WorkoutSchema = require('../models/WorkoutScheduleModel');
const UserProfile = require('../models/UserProfileModel');
const { getUserData } = require('../utils/ageUtil');

/**
 * @desc    get workout schedule for user (userID)
 * @route   GET /workoutSchedule
 * @access  Private
 */
const getWorkoutScheduleByUserID = asyncHandler(async (req, res) => {
  const {
    _userInfoID, schedule, inputs,
  } = await WorkoutSchema.findOne({ _userInfoID: req.user._id });

  if (!schedule) {
    res.status(404).json({ message: 'Meal schedule not found' });
  } else {
    res.status(200).json({
      userInfoID: _userInfoID,
      schedule,
      inputs,
    });
  }
});

/**
 * @desc    create workout schedule for user (userID)
 * @route   POST /workoutSchedule
 * @access  Private
 */
const createWorkoutSchedule = asyncHandler(async (req, res) => {
  // const id = req.user._id;

  // const userProfile = await UserProfile.findOne({ userInfoID: id });
  // const userData = getUserData(userProfile);
  const userData = {
    age: 21,
    sex: 'Male',
    weight: '180',
    fitness: 'beginner',
    healthConditions: 'asthma',
    height: '180',
    timePereference: '5 days',
    durationPreference: '20',
    equipmentAccess: 'dumbbells',
    goal: 'muscle gain',
  };
  const id = 1;

  const generatedSchedule = await openAI.generateWorkoutSchedule(userData);

  const workoutSchedule = await WorkoutSchema.create({
    _userInfoID: id,
    schedule: generatedSchedule,
    inputs: [],
  });

  if (workoutSchedule) {
    res.status(201).json({
      userInfoID: workoutSchedule.id,
      schedule: workoutSchedule.schedule,
      inputs: workoutSchedule.inputs,
    });
  } else {
    res.status(400).json({ message: 'invalid workout schedule data' });
  }
});

/**
 * @desc    update workout schedule for user (userID)
 * @route   PUT /workoutSchedule
 * @access  Private
 */
const updateUserWorkoutScheduleByUserID = (req, res) => {
  // const foundItemIndex = schedules.findIndex((item) => item.userID === req.params.userID);
  const foundItemIndex = null;

  if (foundItemIndex < 0) return res.status(404).send({ message: 'Item not found' });
  if (!req.body.schedule) {
    return res.status(400).send({ message: 'Missing payload' });
  }
  return res.status(400).send({ message: 'Missing payload' });
  // schedules[foundItemIndex].schedule = req.body.schedule;
  // return res.send(schedules[foundItemIndex]);
};

module.exports = {
  getWorkoutScheduleByUserID,
  createWorkoutSchedule,
  updateUserWorkoutScheduleByUserID,
};
