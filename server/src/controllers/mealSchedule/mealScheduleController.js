/* eslint-disable no-await-in-loop */
const asyncHandler = require('express-async-handler');
const openAI = require('../../utils/openaiUtil');
const userUtil = require('../../utils/userUtil');
const MealSchema = require('../../models/MealScheduleModel');
const UserProfile = require('../../models/UserProfileModel');
const { sleep } = require('../../utils/util');

/**
 * @desc    get meal schedule for user (userID)
 * @route   GET /mealSchedule
 * @access  Private
 */
const getMealScheduleByUser = asyncHandler(async (req, res) => {
  let userMealSchedule = await MealSchema
    .findOne({ userInfoID: req.user._id })
    .sort({ _id: -1 });

  while (userMealSchedule.isLoading) {
    sleep(3000);
    userMealSchedule = await MealSchema
      .findOne({ userInfoID: req.user._id })
      .sort({ _id: -1 });
  }

  if (!userMealSchedule?.schedule) {
    res.status(404).json({ message: 'Meal schedule not found' });
  } else {
    const { userInfoID, schedule, inputs } = userMealSchedule;
    res.status(200).json({
      userInfoID,
      schedule,
      inputs,
    });
  }
});

/**
 * @desc extracted helper for generating meal schedule data and updating database
 */
const generateMealScheduleHelper = async (id) => {
  const userProfile = await UserProfile.findOne({ userInfoID: id });

  const mealSchedule = await MealSchema.create({
    userInfoID: id,
    schedule: {},
    inputs: [],
    isLoading: true,
  });

  const userData = userUtil.generateUserObject(userProfile);
  const generatedSchedule = await openAI.generateMealSchedule(userData);

  try {
    const parsedSchedule = JSON.parse(generatedSchedule);
    mealSchedule.schedule = parsedSchedule;
    mealSchedule.isLoading = false;
    const savedSchedule = await mealSchedule.save();
    return savedSchedule;
  } catch {
    return false;
  }
};

/**
 * @desc    create meal schedule for user (userID)
 * @route   POST /mealSchedule
 * @access  Private
 */
const createMealScheduleForUser = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const mealSchedule = await generateMealScheduleHelper(id);

  if (mealSchedule) {
    res.status(201).json({
      userInfoID: id,
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
  const mealSchedule = await MealSchema
    .findOne({ userInfoID: id })
    .sort({ _id: -1 });

  if (!mealSchedule) {
    res.status(404).json({ message: 'Cannot update a meal schedule that does not exist' });
  }

  // Organize the data necessary to adjust the schedule
  const schedule = JSON.stringify(mealSchedule.schedule);
  const updatedInputs = mealSchedule.inputs;
  updatedInputs.push(req.body.customInput);

  const newMealSchedule = await MealSchema.create({
    userInfoID: id,
    schedule: {},
    inputs: updatedInputs,
    isLoading: true,
  });

  // Look up the profile of the user
  const userProfile = await UserProfile.findOne({ userInfoID: id });
  // Update the schedule with OpenAI
  const userData = userUtil.generateUserObject(userProfile);
  const updatedMealSchedule = await openAI.updateMealSchedule(userData, updatedInputs, schedule);

  try {
    // Update the MongoDB document
    const parsedSchedule = JSON.parse(updatedMealSchedule);
    newMealSchedule.schedule = parsedSchedule;
    newMealSchedule.isLoading = false;
    const savedMealSchedule = await newMealSchedule.save();

    // Send updated result
    if (savedMealSchedule) {
      res.status(200).json({
        userInfoID: id,
        schedule: savedMealSchedule.schedule,
        inputs: savedMealSchedule.inputs,
      });
    }
  } catch {
    res.status(400).json({ message: 'invalid meal schedule data' });
  }
});

module.exports = {
  getMealScheduleByUser,
  createMealScheduleForUser,
  updateMealScheduleForUser,
  generateMealScheduleHelper,
};
