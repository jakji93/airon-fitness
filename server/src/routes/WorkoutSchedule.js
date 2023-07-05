const express = require('express');
const { getWorkoutScheduleByUserID, createWorkoutSchedule, updateUserWorkoutScheduleByUserID } = require('../controllers/workoutScheduleController');

const router = express.Router();
// const { generateWorkoutSchedule } = require('../utils/openaiUtil');
const { protect } = require('../middleware/authMiddleware');

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
router.get('/', protect, getWorkoutScheduleByUserID);

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
router.post('/', protect, createWorkoutSchedule);

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
router.put('/', protect, updateUserWorkoutScheduleByUserID);

module.exports = router;
