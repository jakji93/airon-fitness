const express = require('express');
const { getMealScheduleByUser, createMealScheduleForUser, updateMealScheduleForUser } = require('../controllers/mealScheduleController');

const router = express.Router();
const { schedule } = require('./mock/MealScheduleMockData');
const openAI = require('../utils/openaiUtil');

/**
 * @desc get meal schedule for user (Get userID from JWT token)
 * @route GET /mealSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response mealSchedule for user
 *   {userInfoID: string,
 *    schedule:
 *      {Monday:
 *        {breakfast: string,
 *         snack1: string,
 *         lunch: string,
 *         snack2: string
 *         dinner: string}
 *       Tuesday:...
 *       Wednesday:...
 *       ...}
 *    inputs: [string]}
 */
router.get('/', getMealScheduleByUser);

/**
 * @desc create meal schedule for user (Get userID from JWT token)
 * @route POST /mealSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response created mealSchedule
 *   {userInfoID: string,
 *    schedule:
 *      {Monday:
 *        {breakfast: string,
 *         snack1: string,
 *         lunch: string,
 *         snack2: string
 *         dinner: string}
 *       Tuesday:...
 *       Wednesday:...
 *       ...}}
 *    inputs: [string]}
 */
router.post('/:userID', async (req, res) => {
  const tempUser = {
    age: 25,
    sex: 'male',
    weight: '160',
    BMI: '19',
    fitness: 'high',
    healthConditions: 'asthma',
    height: '180',
    timePreference: '5 days per week',
    durationPreference: '60',
    equipmentAcess: 'dumbbells',
    goal: 'gaining muscle'
  }

  try {
    const schedule = await openAI.generateMealSchedule(tempUser);
    res.send(schedule);
  } catch (e) {
    res.sendStatus(500);
  }
});

/**
 * @desc update meal schedule for user (Get userID from JWT token)
 * @route PUT /mealSchedule
 * @request
 *  body:
 *    {input: string}
 *  params: n/a
 *  query params: n/a
 * @response created mealSchedule
 *   {userInfoID: string,
 *    schedule:
 *      {Monday:
 *        {breakfast: string,
 *         snack1: string,
 *         lunch: string,
 *         snack2: string
 *         dinner: string}
 *       Tuesday:...
 *       Wednesday:...
 *       ...}}
 *    inputs: [string]}
 */
router.put('/:userID', (req, res) => {
  const foundItemIndex = schedules.findIndex(item => item.userID === req.params.userID);

  if (foundItemIndex < 0) return res.status(404).send({ message: 'Item not found' });
  if (!req.body.schedule) {
    return res.status(400).send({ message: 'Missing paylod' });
  }
  schedules[foundItemIndex].schedule = req.body.schedule;
  return res.send(schedules[foundItemIndex]);
});

module.exports = router;
