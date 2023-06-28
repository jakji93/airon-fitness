const express = require('express');
const router = express.Router();
const { schedule } = require('./mock/MealScheduleMockData');
const openAI = require('../utils/openaiUtil');

const schedules = [
  {
    userID: "1",
    schedule: schedule
  }
];

// GET /mealSchedule - get meal schedule for user (userID)
// request format:
//     body: n/a
//     params: userID
//     query params: n/a
// returns:
//     {userID: string, 
//      schedule: 
//        {Monday: 
//          {breakfast: string,
//           snack1: string,
//           lunch: string,
//           snack2: string
//           dinner: string}
//         Tuesday:...
//         Wednesday:...
//         ...}}
router.get('/:userID', (req, res) => {
  const foundItem = schedules.find(item => item.userID === req.params.userID);
  if (!foundItem) return res.status(404).send({ message: 'Item not found' });
  res.send(foundItem);
});

// POST /mealSchedule - create meal schedule for user (userID)
// request format:
//     body:
//     {userID: string, 
//      schedule: 
//        {Monday: 
//          {breakfast: string,
//           snack1: string,
//           lunch: string,
//           snack2: string
//           dinner: string}
//          Tuesday:...
//          Wednesday:...
//          ...}}
//     params: n/a
//     query params: n/a
// returns:
//     {userID: string, 
//      schedule: 
//        {Monday: 
//          {breakfast: string,
//           snack1: string,
//           lunch: string,
//           snack2: string
//           dinner: string}
//         Tuesday:...
//         Wednesday:...
//         ...}}
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

// PUT /mealSchedule - update meal schedule for user (userID)
// request format:
//     body:
//     {userID: string, 
//      schedule: 
//        {Monday: 
//          {breakfast: string,
//           snack1: string,
//           lunch: string,
//           snack2: string
//           dinner: string}
//          Tuesday:...
//          Wednesday:...
//          ...}}
//     params: userID
//     query params: n/a
// returns:
//     {userID: string, 
//      schedule: 
//        {Monday: 
//          {breakfast: string,
//           snack1: string,
//           lunch: string,
//           snack2: string
//           dinner: string}
//         Tuesday:...
//         Wednesday:...
//         ...}}
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