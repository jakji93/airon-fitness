const express = require('express');
const { getWorkoutScheduleByUserID, createWorkoutSchedule, updateUserWorkoutScheduleByUserID } = require('../controllers/workoutScheduleController');

const router = express.Router();

/**
 * @desc get workout schedule for user (Get userID from JWT token)
 * @access Private
 * @route GET /workoutSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response workoutSchedule for user
 *    {userID: string,
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
router.get('/', getWorkoutScheduleByUserID);

/**
 * @desc create workout schedule for user (Get userID from JWT token)
 * @access Private
 * @route POST /workoutSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response created workoutSchedule for User
 *    {userID: string,
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
router.post('/', createWorkoutSchedule);

/**
 * @desc update workout schedule for user (Get userID from JWT token)
 * @access Private
 * @route PUT /workoutSchedule
 * @request
 *  body:
 *    {input: string}
 *  params: n/a
 *  query params: n/a
 * @response updated workoutSchedule for User
 *    {userID: string,
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
router.put('/:userID', updateUserWorkoutScheduleByUserID);

module.exports = router;
