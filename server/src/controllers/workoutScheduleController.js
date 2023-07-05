const asyncHandler = require('express-async-handler');
const openAI = require('../utils/openaiUtil');

/**
 * @desc    get workout schedule for user (userID)
 * @route   GET /workoutSchedule
 * @access  Private
 */
const getWorkoutScheduleByUserID = (req, res) => {
  const foundItem = schedules.find((item) => item.userID === req.params.userID);
  if (!foundItem) return res.status(404).send({ message: 'Item not found' });
  return res.send(foundItem);
};

/**
 * @desc    create workout schedule for user (userID)
 * @route   POST /workoutSchedule
 * @access  Private
 */
const createWorkoutSchedule = asyncHandler(async (req, res) => {
  const tempUser = {
    age: 25,
    sex: 'male',
    weight: '186',
    BMI: '23',
    fitness: 'high',
    healthConditions: 'asthma',
    height: '180',
    timePreference: '5 days per week',
    durationPreference: '60',
    equipmentAcess: 'dumbbells',
    goal: 'weight loss',
  };

  try {
    const schedule = await openAI.generateWorkoutSchedule(tempUser);
    res.send(schedule);
  } catch (e) {
    res.sendStatus(500);
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
