const asyncHandler = require('express-async-handler');
const openAI = require('../utils/openaiUtil');
const WorkoutSchema = require('../models/WorkoutScheduleModel');
const UserProfile = require('../models/UserProfileModel');
const userUtil = require('../utils/userUtil');

/**
 * @desc    get latest workout schedule for user (userID)
 * @route   GET /workoutSchedule
 * @access  Private
 */
const getLatestWorkoutScheduleByUserID = asyncHandler(async (req, res) => {
  const {
    userInfoID, schedule, inputs,
  } = await WorkoutSchema.findOne({ userInfoID: req.user._id }).sort({ _id: -1 });

  if (!schedule) {
    res.status(404).json({ message: 'Workout schedule not found' });
  } else {
    res.status(200).json({
      userInfoID,
      schedule,
      inputs,
    });
  }
});

/**
 * @desc    get all workout schedule for user (userID)
 * @route   GET /workoutSchedule/all
 * @access  Private
 */
const getAllWorkoutScheduleByUserID = asyncHandler(async (req, res) => {
  const schedules = await WorkoutSchema.find({ userInfoID: req.user._id }).sort({ _id: 1 });

  if (!schedules) {
    res.status(404).json({ message: 'Workout schedules not found' });
  } else {
    res.status(200).json({
      schedules,
    });
  }
});

/**
 * @desc    create workout schedule for user (userID)
 * @route   POST /workoutSchedule
 * @access  Private
 */
const createWorkoutSchedule = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const userProfile = await UserProfile.findOne({ userInfoID: id });

  const userData = userUtil.generateUserObject(userProfile);
  const generatedSchedule = await openAI.generateWorkoutSchedule(userData);

  const workoutSchedule = await WorkoutSchema.create({
    userInfoID: id,
    schedules: generatedSchedule,
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
const updateUserWorkoutScheduleByUserID = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const workoutSchedule = await WorkoutSchema.findOne({ userInfoID: id }).sort({ _id: -1 });
  if (!workoutSchedule) {
    res.status(404).json({ message: 'Cannot update a workout schedule that does not exist' });
  }

  const schedule = JSON.stringify(workoutSchedule.schedule);
  const inputs = workoutSchedule.inputs;
  inputs.push(req.body.customInput);

  const userProfile = await UserProfile.findOne({ userInfoID: id });

  const userData = userUtil.generateUserObject(userProfile);

  const updatedWorkoutSchedule = await openAI.updateWorkoutSchedule(userData, inputs, schedule);

  workoutSchedule.schedule = updatedWorkoutSchedule;
  workoutSchedule.inputs = inputs;
  const savedWorkoutSchedule = await workoutSchedule.save();

  if (savedWorkoutSchedule) {
    res.status(200).json({
      userInfoID: savedWorkoutSchedule.id,
      schedule: savedWorkoutSchedule.schedule,
      inputs: savedWorkoutSchedule.inputs,
    });
  }
});

module.exports = {
  getLatestWorkoutScheduleByUserID,
  getAllWorkoutScheduleByUserID,
  createWorkoutSchedule,
  updateUserWorkoutScheduleByUserID,
};
