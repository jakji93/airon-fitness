const asyncHandler = require('express-async-handler');
const openAI = require('../../utils/openaiUtil');
const userUtil = require('../../utils/userUtil');
const MealSchema = require('../../models/MealScheduleModel');
const UserProfile = require('../../models/UserProfileModel');

/**
 * @desc    get meal schedule for user (userID)
 * @route   GET /mealSchedule
 * @access  Private
 */
const getMealScheduleByUser = asyncHandler(async (req, res) => {
  const userMealSchedule = await MealSchema
    .findOne({ userInfoID: req.user._id })
    .sort({ _id: -1 });

  if (!userMealSchedule || !userMealSchedule.schedule) {
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

  const userData = userUtil.generateUserObject(userProfile);
  const generatedSchedule = await openAI.generateMealSchedule(userData);

  try {
    const parsedSchedule = JSON.parse(generatedSchedule);
    const mealSchedule = await MealSchema.create({
      userInfoID: id,
      schedule: parsedSchedule,
      inputs: [],
    });
    return mealSchedule;
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

  // Look up the profile of the user
  const userProfile = await UserProfile.findOne({ userInfoID: id });

  // Update the schedule with OpenAI
  const userData = userUtil.generateUserObject(userProfile);
  const updatedMealSchedule = await openAI.updateMealSchedule(userData, updatedInputs, schedule);

  try {
    // Update the MongoDB document
    const parsedSchedule = JSON.parse(updatedMealSchedule);
    mealSchedule.schedule = parsedSchedule;
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
