const asyncHandler = require('express-async-handler');
const MealSchedule = require('../models/MealScheduleModel');
const { mealScheduleMockMTWTFSS } = require('../mock/MealScheduleMockData');

/**
 * @desc    use mock data to create a user schedule (NO OPENAI CALL)
 * @route   POST /mock/mealSchedule
 * @access  Private
 */
const MOCKcreateMealScheduleForUser = asyncHandler(async (req, res) => {
  const id = req.user._id;

  // Check if user already has a meal schedule
  const mealScheduleExists = await MealSchedule.findOne({ userInfoID: id });
  if (mealScheduleExists) {
    res.status(400).json({ message: 'Meal schedule already exists' });
  }

  // Look up the profile of the user
  // const userProfile = await UserProfile.findOne({ userInfoID: id });

  // Generate the schedule with OpenAI
  // const userData = userUtil.generateUserObject(userProfile);
  // const generatedSchedule = await openAI.generateMealSchedule(userData);

  /** Use a MOCK SCHEDULE */
  const mockSchedule = mealScheduleMockMTWTFSS;

  // Create meal in MongoDB
  const mealSchedule = await MealSchedule.create({
    userInfoID: id,
    schedule: mockSchedule,
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
 * @desc    use mock data to update meal schedule (NO OPEN AI CALL)
 * @route   PUT /mock/mealSchedule
 * @access  Private
 */
const MOCKupdateMealScheduleForUser = asyncHandler(async (req, res) => {
  const id = req.user._id;

  // Retrieve the meal schedule (fail if user does not have one already)
  const mealSchedule = await MealSchedule.findOne({ userInfoID: id });
  if (!mealSchedule) {
    res.status(404).json({ message: 'Cannot update a meal schedule that does not exist' });
  }

  // Organize the data necessary to adjust the schedule
  // const schedule = JSON.stringify(mealSchedule.schedule);
  const updatedInputs = mealSchedule.inputs;
  updatedInputs.push(req.body.customInput);

  // // Look up the profile of the user
  // const userProfile = await UserProfile.findOne({ userInfoID: id });

  // Update the schedule with OpenAI
  // const userData = userUtil.generateUserObject(userProfile);
  // const updatedMealSchedule = await openAI.updateMealSchedule(userData, updatedInputs, schedule);

  /** Use a MOCK SCHEDULE */
  const mockSchedule = mealScheduleMockMTWTFSS;

  // Update the MongoDB document
  mealSchedule.schedule = mockSchedule;
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
  MOCKcreateMealScheduleForUser,
  MOCKupdateMealScheduleForUser,
};
