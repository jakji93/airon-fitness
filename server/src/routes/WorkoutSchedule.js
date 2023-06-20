const express = require('express');
const router = express.Router();

const scheudle = {
  Monday: [
    {
      exercise: "Barbell Squats",
      sets: 3,
      reps: 10,
      rest: 60,
      duration: null,
      intensity: 75
    },
    {
      exercise: "Bench Press",
      sets: 3,
      reps: 10,
      rest: 60,
      duration: null,
      intensity: 75
    },
    {
      exercise: "Lat Pulldowns",
      sets: 3,
      reps: 12,
      rest: 60,
      duration: null,
      intensity: 70
    },
    {
      exercise: "Plank",
      sets: 3,
      reps: 60,
      rest: 30,
      duration: null,
      intensity: 60
    }
  ],
  Wednesday: [
    {
      exercise: "Deadlifts",
      sets: 3,
      reps: 8,
      rest: 60,
      duration: null,
      intensity: 80
    },
    {
      exercise: "Military Press",
      sets: 3,
      reps: 10,
      rest: 60,
      duration: null,
      intensity: 70
    },
    {
      exercise: "Seated Cable Rows",
      sets: 3,
      reps: 12,
      rest: 60,
      duration: null,
      intensity: 70
    },
    {
      exercise: "Jumping Jacks",
      sets: 3,
      reps: 30,
      rest: 30,
      duration: null,
      intensity: 60
    }
  ],
  Friday: [
    {
      exercise: "Dumbbell Lunges",
      sets: 3,
      reps: 12,
      rest: 60,
      duration: null,
      intensity: 75
    },
    {
      exercise: "Incline Dumbbell Press",
      sets: 3,
      reps: 10,
      rest: 60,
      duration: null,
      intensity: 75
    },
    {
      exercise: "Pull-ups",
      sets: 3,
      reps: 8,
      rest: 60,
      duration: null,
      intensity: 80
    },
    {
      exercise: "Treadmill Running",
      sets: 3,
      reps: 10,
      rest: 60,
      duration: 5,
      intensity: 70
    }
  ]
};

const schedules = [
  {
    userID: "1",
    schedule: scheudle
  }
];

// GET /workoutschedule - get workout schedule for user (userID)
// request format:
//     body: n/a
//     params: userID
//     query params: n/a
// returns:
//     {userID: string, 
//      schedule: 
//        {Monday: 
//          {exercise: string,
//           sets: num,
//           reps: num,
//           rest: num
//           duration: num
//           intensity: num}
//         Tuesday:...
//         Wednesday:...
//         ...}}
router.get('/:userID', (req, res) => {
  const foundItem = schedules.find(item => item.userID === req.params.userID);
  if (!foundItem) return res.status(404).send({ message: 'Item not found' });
  res.send(foundItem);
});

// POST /workoutschedule - create workout schedule for user (userID)
// request format:
//     body:
//     {userID: string, 
//      schedule: 
//        {Monday: 
//          {exercise: string,
//           sets: num,
//           reps: num,
//           rest: num
//           duration: num
//           intensity: num}
//         Tuesday:...
//         Wednesday:...
//         ...}}
//     params: n/a
//     query params: n/a
// returns:
//     {userID: string, 
//      schedule: 
//        {Monday: 
//          {exercise: string,
//           sets: num,
//           reps: num,
//           rest: num
//           duration: num
//           intensity: num}
//         Tuesday:...
//         Wednesday:...
//         ...}}
router.post('/', (req, res) => {
  if(!req.body.schedule) {
    return res.status(400).send({message: "Missing Payload"});
  }
  const item = {userID: req.body.userID, schedule: req.body.schedule};
  schedules.push(item);
  return res.send(item);
});

// PUT /workoutschedule - update workout schedule for user (userID)
// request format:
//     body:
//     {userID: string, 
//      schedule: 
//        {Monday: 
//          {exercise: string,
//           sets: num,
//           reps: num,
//           rest: num
//           duration: num
//           intensity: num}
//         Tuesday:...
//         Wednesday:...
//         ...}}
//     params: userID
//     query params: n/a
// returns:
//     {userID: string, 
//      schedule: 
//        {Monday: 
//          {exercise: string,
//           sets: num,
//           reps: num,
//           rest: num
//           duration: num
//           intensity: num}
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