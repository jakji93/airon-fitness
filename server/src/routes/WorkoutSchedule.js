const express = require('express');
const { getWorkoutScheduleByUserID, createWorkoutSchedule, updateUserWorkoutScheduleByUserID } = require('../controllers/workoutScheduleController');

const router = express.Router();
// const { generateWorkoutSchedule } = require('../utils/openaiUtil');
const openAI = require('../utils/openaiUtil');

/**
 * @desc get workout schedule for user (Get userID from JWT token)
 * @route GET /workoutSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response workoutSchedule for user
 *    {userInfoID: string,
 *     schedule:
 *       {Monday:
 *         {exercise: string,
 *          sets: num,
 *          reps: num,
 *          rest: num
 *          duration: num
 *          intensity: num}
 *        Tuesday:...
 *        Wednesday:...
 *        ...}}
 *     inputs: [string]}
 */
router.get('/:userID', (req, res) => {
  const foundItem = schedules.find(item => item.userID === req.params.userID);
  if (!foundItem) return res.status(404).send({ message: 'Item not found' });
  res.send(foundItem);
});

/**
 * @desc create workout schedule for user (Get userID from JWT token)
 * @route POST /workoutSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response created workoutSchedule for User
 *    {userInfoID: string,
 *     schedule:
 *       {Monday:
 *         {exercise: string,
 *          sets: num,
 *          reps: num,
 *          rest: num
 *          duration: num
 *          intensity: num}
 *        Tuesday:...
 *        Wednesday:...
 *        ...}}
 *     inputs: [string]}
 */
router.post('/:userID', async (req, res) => {
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
    goal: 'weight loss'
  }

  try {
    const schedule = await openAI.generateWorkoutSchedule(tempUser);
    res.send(schedule);
  } catch (e) {
    res.sendStatus(500);
  }
});

/**
 * @desc update workout schedule for user (Get userID from JWT token)
 * @route PUT /workoutSchedule
 * @request
 *  body:
 *    {input: string}
 *  params: n/a
 *  query params: n/a
 * @response updated workoutSchedule for User
 *    {userInfoID: string,
 *     schedule:
 *       {Monday:
 *         {exercise: string,
 *          sets: num,
 *          reps: num,
 *          rest: num
 *          duration: num
 *          intensity: num}
 *        Tuesday:...
 *        Wednesday:...
 *        ...}}
 *     inputs: [string]}
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
