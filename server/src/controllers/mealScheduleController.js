const { schedule } = require('../mock/MealScheduleMockData');

const schedules = [
  {
    userID: '1',
    schedule,
  },
];

/**
 * @desc    get meal schedule for user (userID)
 * @route   GET /mealSchedule
 * @access  Private
 */
const getMealScheduleByUser = (req, res) => {
  const foundItem = schedules.find((item) => item.userID === req.params.userID);
  if (!foundItem) return res.status(404).send({ message: 'Item not found' });
  return res.send(foundItem);
};

/**
 * @desc    create meal schedule for user (userID)
 * @route   POST /mealSchedule
 * @access  Private
 */
const createMealScheduleForUser = (req, res) => {
  if (!req.body.schedule) {
    return res.status(400).send({ message: 'Missing Payload' });
  }
  const item = { userID: req.body.userID, schedule: req.body.schedule };
  schedules.push(item);
  return res.send(item);
};

/**
 * @desc    update meal schedule for user (userID)
 * @route   PUT /mealSchedule
 * @access  Private
 */
const updateMealScheduleForUser = (req, res) => {
  const foundItemIndex = schedules.findIndex((item) => item.userID === req.params.userID);

  if (foundItemIndex < 0) return res.status(404).send({ message: 'Item not found' });
  if (!req.body.schedule) {
    return res.status(400).send({ message: 'Missing paylod' });
  }
  schedules[foundItemIndex].schedule = req.body.schedule;
  return res.send(schedules[foundItemIndex]);
};

module.exports = {
  getMealScheduleByUser,
  createMealScheduleForUser,
  updateMealScheduleForUser,
};
