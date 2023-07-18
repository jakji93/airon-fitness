/** mock router for creating/updating mealschedule/workoutSchedule without calling openai */
const express = require('express');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { MOCKcreateMealScheduleForUser, MOCKupdateMealScheduleForUser } = require('../controllers/workoutSchedule/mockMealScheduleController');
const { MOCKupdateUserWorkoutScheduleByUserID, MOCKcreateWorkoutSchedule } = require('../controllers/workoutSchedule/mockWorkoutScheduleController');
const { MOCKcreateWorkoutAndMealSchedule } = require('../controllers/workoutSchedule/mockWorkoutAndMealSchedule');

/**
 * @desc use mock data to create a user schedule (NO OPENAI CALL)
 * @access Private
 * @route POST /mock/mealSchedule
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
router.post('/mealSchedule', protect, MOCKcreateMealScheduleForUser);

/**
 * @desc use mock data to update meal schedule (NO OPEN AI CALL)
 * @access Private
 * @route PUT /mock/mealSchedule
 * @request
 *  body:
 *    {input: string}
 *  params: n/a
 *  query params: n/a
 * @response updated mealSchedule
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
router.put('/mealSchedule', protect, MOCKupdateMealScheduleForUser);

/**
 * @desc use mock data to create workout schedule (NO OPENAI CALL)
 * @access Private
 * @route POST /mock/workoutSchedule
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
router.post('/workoutSchedule', protect, MOCKcreateWorkoutSchedule);

/**
 * @desc use mock data to update workout schedule (NO OPENAI CALL)
 * @access Private
 * @route PUT /mock/workoutSchedule
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
router.put('/workoutSchedule', protect, MOCKupdateUserWorkoutScheduleByUserID);

/**
  * @desc    use mock data to
 *            create workout schedule and
 *            create meal schedule
 *            (NO OPENAI CALL)
 * @access Private
 * @route POST /mock/workoutMealSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response created mealSchedule & workoutSchedule
 *   {
 *       "mealSchedule": {
 *           "userInfoID": "64a75a8fd5db4f1acaaa41ef",
 *           "schedule": {
 *               "Monday": {
 *                   "breakfast": "...",
 *                   "snack1": "...",
 *                   "lunch": "...",
 *                   "snack2": "...",
 *                   "dinner": "...",
 *               },
 *               "Tuesday": ...
 *           },
 *           "inputs": [],
 *           "_id": "64af93876766233058d8c04d",
 *           "createdAt": "2023-07-13T06:02:47.511Z",
 *           "updatedAt": "2023-07-13T06:02:47.511Z",
 *           "__v": 0
 *       },
 *       "workoutSchedule": {
 *           "userInfoID": "64a75a8fd5db4f1acaaa41ef",
 *           "schedule": {
 *               "Monday": [
 *                   {
 *                       "exercise": "Barbell Squats",
 *                       "sets": 3,
 *                       "reps": 10,
 *                       "rest": 60,
 *                       "duration": null,
 *                       "intensity": 75
 *                   },
 *                   ...
 *               ],
 *               "Wednesday": ...
 *           },
 *           "inputs": [],
 *           "_id": "64af93876766233058d8c04f",
 *           "createdAt": "2023-07-13T06:02:47.633Z",
 *           "updatedAt": "2023-07-13T06:02:47.633Z",
 *           "__v": 0
 *       }
 *   }
 *
 */
router.post('/workoutMealSchedule', protect, MOCKcreateWorkoutAndMealSchedule);

module.exports = router;
