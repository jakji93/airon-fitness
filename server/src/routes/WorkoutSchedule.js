const express = require('express');
const {
  getLatestWorkoutScheduleByUserID,
  getAllWorkoutScheduleByUserID,
  createWorkoutSchedule,
  updateUserWorkoutScheduleByUserID,
} = require('../controllers/workoutScheduleController');

const router = express.Router();
// const { generateWorkoutSchedule } = require('../utils/openaiUtil');
const { protect } = require('../middleware/authMiddleware');

/**
 * @desc get lastest workout schedule for user (Get userID from JWT token)
 * @access Private
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
router.get('/', protect, getLatestWorkoutScheduleByUserID);

/**
 * @desc get all workout schedule for user (Get userID from JWT token)
 * @access Private
 * @route GET /workoutSchedule/all
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response workoutSchedule for user sort from oldest to newest
 *  {schedules: [
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
 *     inputs: [string]},
 *    ...]}
 */
router.get('/all', protect, getAllWorkoutScheduleByUserID);

/**
 * @desc create workout schedule for user (Get userID from JWT token)
 * @access Private
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
 * @access Private
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
