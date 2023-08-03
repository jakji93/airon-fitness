/* eslint-disable no-await-in-loop */
const asyncHandler = require('express-async-handler');
const openAI = require('../../utils/openaiUtil');
const WorkoutSchema = require('../../models/WorkoutScheduleModel');
const UserProfile = require('../../models/UserProfileModel');
const userUtil = require('../../utils/userUtil');
const { sleep } = require('../../utils/util');

/**
 * @desc    get latest workout schedule for user (userID)
 * @route   GET /workoutSchedule
 * @access  Private
 */
const getLatestWorkoutScheduleByUserID = asyncHandler(async (req, res) => {
  let userWorkoutSchedule = await WorkoutSchema.findOne(
    { userInfoID: req.user._id },
  ).sort({ _id: -1 });

  while (userWorkoutSchedule.isLoading) {
    sleep(3000);
    userWorkoutSchedule = await WorkoutSchema
      .findOne({ userInfoID: req.user._id })
      .sort({ _id: -1 });
  }

  if (!userWorkoutSchedule || !userWorkoutSchedule.schedule) {
    res.status(404).json({ message: 'Workout schedule not found' });
  } else {
    const {
      userInfoID, schedule, inputs,
    } = userWorkoutSchedule;
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
 * @desc extracted helper for generating workout schedule data and updating database
 */
const generateWorkoutScheduleHelper = async (id) => {
  const userProfile = await UserProfile.findOne({ userInfoID: id });

  const workoutSchedule = await WorkoutSchema.create({
    userInfoID: id,
    schedule: {},
    inputs: [],
    isLoading: true,
  });

  const userData = userUtil.generateUserObject(userProfile);
  const generatedSchedule = await openAI.generateWorkoutSchedule(userData);

  workoutSchedule.schedule = JSON.parse(generatedSchedule);
  workoutSchedule.isLoading = false;
  const savedSchedule = await workoutSchedule.save();

  return savedSchedule;
};

/**
 * @desc    create workout schedule for user (userID)
 * @route   POST /workoutSchedule
 * @access  Private
 */
const createWorkoutSchedule = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const workoutSchedule = await generateWorkoutScheduleHelper(id);

  if (workoutSchedule) {
    res.status(201).json({
      userInfoID: req.user._id,
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
  const updatedInputs = workoutSchedule.inputs;
  updatedInputs.push(req.body.customInput);

  const userProfile = await UserProfile.findOne({ userInfoID: id });

  const userData = userUtil.generateUserObject(userProfile);
  const updatedWorkoutSchedule = await openAI.updateWorkoutSchedule(
    userData,
    updatedInputs,
    schedule,
  );

  workoutSchedule.schedule = JSON.parse(updatedWorkoutSchedule);
  workoutSchedule.inputs = updatedInputs;
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
  generateWorkoutScheduleHelper,
};
