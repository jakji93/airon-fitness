/** mock router for creating/updating mealschedule/workoutSchedule without calling openai */
const express = require('express');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { MOCKcreateMealScheduleForUser, MOCKupdateMealScheduleForUser } = require('../controllers/mealScheduleMockController');
const { MOCKupdateUserWorkoutScheduleByUserID, MOCKcreateWorkoutSchedule } = require('../controllers/workoutScheduleMockController');

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

module.exports = router;
