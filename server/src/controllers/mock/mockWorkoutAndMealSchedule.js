const asyncHandler = require('express-async-handler');
const WorkoutSchema = require('../../models/WorkoutScheduleModel');
const MealSchedule = require('../../models/MealScheduleModel');
const { mealScheduleMockMTWTFSS } = require('../../mock/MealScheduleMockData');
const { workoutScheduleMock } = require('../../mock/WorkoutScheduleMockData');

/**
 * @desc    use mock data to
 *            create workout schedule and
 *            create meal schedule
 *            (NO OPENAI CALL)
 * @route   POST /mock/workoutMealSchedule
 * @access  Private
 */
const MOCKcreateWorkoutAndMealSchedule = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const workoutScheduleExists = await WorkoutSchema.findOne({ userInfoID: id });
  const mealScheduleExists = await MealSchedule.findOne({ userInfoID: id });
  if (workoutScheduleExists || mealScheduleExists) {
    res.status(400).json({ message: 'schedules already exists' });
  }

  /** Use a MOCK SCHEDULE instead of open ai call */
  const mockMealSchedule = mealScheduleMockMTWTFSS;
  const mockWorkoutSchedule = workoutScheduleMock;

  // Create document in MongoDB
  const mealSchedule = await MealSchedule.create({
    userInfoID: id,
    schedule: mockMealSchedule,
    inputs: [],
  });
  const workoutSchedule = await WorkoutSchema.create({
    userInfoID: id,
    schedule: mockWorkoutSchedule,
    inputs: [],
  });

  if (mealSchedule && workoutSchedule) {
    res.status(201).json({
      mealSchedule,
      workoutSchedule,
    });
  } else {
    res.status(400).json({ message: 'invalid meal schedule data' });
  }
});

module.exports = {
  MOCKcreateWorkoutAndMealSchedule,
};
