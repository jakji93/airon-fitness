const express = require('express');
const {
  getLatestWorkoutScheduleByUserID,
  getAllWorkoutScheduleByUserID,
  createWorkoutSchedule,
  updateUserWorkoutScheduleByUserID,
} = require('../controllers/workoutSchedule/workoutScheduleController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

/**
 * @desc get latest workout schedule for user (Get userID from JWT token)
 * @access Private
 * @route GET /workoutSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response workoutSchedule for user
 *    {userInfoID: string,
 *     schedule:
 *      {Monday:
 *        {exercises:
 *          [{exercise: string,
 *            sets: number,
 *            reps: number,
 *            rest: number,
 *            duration: number,
 *            intensity: number.
 *            calories: number,
 *           },
 *          ...
 *          ],
 *          total_calories: number
 *       }
 *      {Tuesday:... }
 *      ...
 *      inputs: [string]
 *     }
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
 *      {Monday:
 *        {exercises:
 *          [{exercise: string,
 *            sets: number,
 *            reps: number,
 *            rest: number,
 *            duration: number,
 *            intensity: number.
 *            calories: number,
 *           },
 *          ...
 *          ],
 *          total_calories: number
 *       }
 *      {Tuesday:... }
 *      ...
 *      inputs: [string]}...
 *    ]
 *  }
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
 *      {Monday:
 *        {exercises:
 *          [{exercise: string,
 *            sets: number,
 *            reps: number,
 *            rest: number,
 *            duration: number,
 *            intensity: number.
 *            calories: number,
 *           },
 *          ...
 *          ],
 *          total_calories: number
 *       }
 *      {Tuesday:... }
 *      ...
 *      inputs: [string]
 *     }
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
 *      {Monday:
 *        {exercises:
 *          [{exercise: string,
 *            sets: number,
 *            reps: number,
 *            rest: number,
 *            duration: number,
 *            intensity: number.
 *            calories: number,
 *           },
 *          ...
 *          ],
 *          total_calories: number
 *       }
 *      {Tuesday:... }
 *      ...
 *      inputs: [string]
 *     }
 */
router.put('/', protect, updateUserWorkoutScheduleByUserID);

module.exports = router;
