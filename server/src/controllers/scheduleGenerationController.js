const asyncHandler = require('express-async-handler');
const MealSchema = require('../models/MealScheduleModel');
const WorkoutSchema = require('../models/WorkoutScheduleModel');
const { generateMealScheduleHelper } = require('./mealSchedule/mealScheduleController');
const { generateWorkoutScheduleHelper } = require('./workoutSchedule/workoutScheduleController');

/**
 * @desc generate workout and meal schedules based on user profile information
 * @route POST /userProfile/generate
 * @access  Private
 */
const generateSchedules = asyncHandler(async (req, res) => {
  const id = req.user._id;

  // check if schedules already exist for user
  const mealScheduleExists = await MealSchema.findOne({ userInfoID: id });
  const workoutScheduleExists = await WorkoutSchema.findOne({ userInfoID: id });

  if (mealScheduleExists || workoutScheduleExists) {
    res.status(400).json({
      message: `Error:
                ${mealScheduleExists ? 'Meal schedule already exists' : ''}
                ${workoutScheduleExists ? 'Workout schedule already exists' : ''}`,
    });
  }

  // parallel generation and database storage of schedules
  const [meals, workouts] = await
  Promise.all([generateMealScheduleHelper(id), generateWorkoutScheduleHelper(id)]);

  if (meals && workouts) {
    res.status(200).json({
      userInfoID: id,
      workoutSchedule: workouts.schedule,
      mealSchedule: meals.schedule,
    });
  } else {
    res.status(400).json({ message: 'invalid schedule data' });
  }
});

module.exports = {
  generateSchedules,
};
