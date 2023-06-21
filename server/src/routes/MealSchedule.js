const express = require('express');

const router = express.Router();
const { schedule } = require('../mock/MealScheduleMockData');

const schedules = [
  {
    userID: '1',
    schedule,
  },
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
  const foundItem = schedules.find((item) => item.userID === req.params.userID);
  if (!foundItem) return res.status(404).send({ message: 'Item not found' });
  return res.send(foundItem);
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
router.post('/', (req, res) => {
  if (!req.body.schedule) {
    return res.status(400).send({ message: 'Missing Payload' });
  }
  const item = { userID: req.body.userID, schedule: req.body.schedule };
  schedules.push(item);
  return res.send(item);
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
  const foundItemIndex = schedules.findIndex((item) => item.userID === req.params.userID);

  if (foundItemIndex < 0) return res.status(404).send({ message: 'Item not found' });
  if (!req.body.schedule) {
    return res.status(400).send({ message: 'Missing paylod' });
  }
  schedules[foundItemIndex].schedule = req.body.schedule;
  return res.send(schedules[foundItemIndex]);
});

module.exports = router;
