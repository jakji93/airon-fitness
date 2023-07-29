const asyncHandler = require('express-async-handler');
const { generateMealScheduleHelper } = require('./mealSchedule/mealScheduleController');
const { generateWorkoutScheduleHelper } = require('./workoutSchedule/workoutScheduleController');

/**
 * @desc generate workout and meal schedules based on user profile information
 * @route POST /userProfile/generate
 * @access  Private
 */
const generateSchedules = asyncHandler(async (req, res) => {
  const id = req.user._id;

  // parallel generation and database storage of schedules
  const [meals, workouts] = await
  Promise.all([generateMealScheduleHelper(id), generateWorkoutScheduleHelper(id)]);

  if (meals && workouts) {
    res.status(200).json({
      userInfoID: id,
      workoutSchedule: workouts,
      mealSchedule: meals,
    });
  } else {
    res.status(400).json({ message: 'invalid schedule data' });
  }
});

module.exports = {
  generateSchedules,
};
