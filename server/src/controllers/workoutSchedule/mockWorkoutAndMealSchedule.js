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

const MOCKgetPaginatedWorkoutAndMealSchedule = asyncHandler(async (req, res) => {
  const { page } = req.body;
  console.log(req.body);
  const docsPerPage = 2;
  const numDocsToRetrieve = docsPerPage * page;
  const skip = page !== 0 ? docsPerPage * (page - 1) : 0;

  const query = { userInfoID: '64b8e6040748c356e6f67978' };
  const options = { sort: { createdBy: -1 }, limit: numDocsToRetrieve };

  let combinedSchedules = await Promise.all([
    WorkoutSchema.find(query, 'createdAt schedule inputs', options),
    MealSchedule.find(query, 'createdAt schedule inputs', options),
  ]);

  const countWorkouts = await WorkoutSchema.countDocuments(query);
  const countMeals = await MealSchedule.countDocuments(query);

  const totalPages = Math.ceil((countWorkouts + countMeals) / docsPerPage);

  combinedSchedules = combinedSchedules.flat();
  // eslint-disable-next-line max-len
  combinedSchedules.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log(combinedSchedules);
  combinedSchedules = combinedSchedules.slice(skip, skip + docsPerPage);
  console.log({
    pagination: {
      page,
      max: totalPages,
      items: combinedSchedules,
    },
  });

  res.status(200).json({
    pagination: {
      page,
      max: totalPages,
      items: combinedSchedules,
    },
  });
});

module.exports = {
  MOCKcreateWorkoutAndMealSchedule,
  MOCKgetPaginatedWorkoutAndMealSchedule,
};
