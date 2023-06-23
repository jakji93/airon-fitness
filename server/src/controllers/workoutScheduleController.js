const { schedule } = require('../mock/WorkoutScheduleMockData');

const schedules = [
  {
    userID: '1',
    schedule,
  },
];

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
const createWorkoutSchedule = (req, res) => {
  if (!req.body.schedule) {
    return res.status(400).send({ message: 'Missing Payload' });
  }
  const item = { userID: req.body.userID, schedule: req.body.schedule };
  schedules.push(item);
  return res.send(item);
};

/**
 * @desc    update workout schedule for user (userID)
 * @route   PUT /workoutSchedule
 * @access  Private
 */
const updateUserWorkoutScheduleByUserID = (req, res) => {
  const foundItemIndex = schedules.findIndex((item) => item.userID === req.params.userID);

  if (foundItemIndex < 0) return res.status(404).send({ message: 'Item not found' });
  if (!req.body.schedule) {
    return res.status(400).send({ message: 'Missing payload' });
  }
  schedules[foundItemIndex].schedule = req.body.schedule;
  return res.send(schedules[foundItemIndex]);
};

module.exports = {
  getWorkoutScheduleByUserID,
  createWorkoutSchedule,
  updateUserWorkoutScheduleByUserID,
};
