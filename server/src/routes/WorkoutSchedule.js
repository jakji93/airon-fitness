const express = require('express');
const { getWorkoutScheduleByUserID, createWorkoutSchedule, updateUserWorkoutScheduleByUserID } = require('../controllers/workoutScheduleController');

const router = express.Router();

/**
 * @desc get workout schedule for user (userID)
 * @route GET /workoutSchedule
 * @request
 *  body: n/a
 *  params: userID
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
 */
router.get('/:userID', getWorkoutScheduleByUserID);

/**
 * @desc create workout schedule for user (userID)
 * @route POST /workoutSchedule
 * @request
 *  body:
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
 */
router.post('/', createWorkoutSchedule);

/**
 * @desc update workout schedule for user (userID)
 * @route PUT /workoutSchedule
 * @request
 *  body:
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
 */
router.put('/:userID', updateUserWorkoutScheduleByUserID);

module.exports = router;
