const express = require('express');
const { getMealScheduleByUser, createMealScheduleForUser, updateMealScheduleForUser } = require('../controllers/mealScheduleController');

const router = express.Router();

/**
 * @desc get meal schedule for user (Get userID from JWT token)
 * @route GET /mealSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response mealSchedule for user
 *   {userID: string,
 *    schedule:
 *      {Monday:
 *        {breakfast: string,
 *         snack1: string,
 *         lunch: string,
 *         snack2: string
 *         dinner: string}
 *       Tuesday:...
 *       Wednesday:...
 *       ...}
 *    inputs: [string]}
 */
router.get('/', getMealScheduleByUser);

/**
 * @desc create meal schedule for user (Get userID from JWT token)
 * @route POST /mealSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response created mealSchedule
 *   {userID: string,
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
router.post('/', createMealScheduleForUser);

/**
 * @desc update meal schedule for user (Get userID from JWT token)
 * @route PUT /mealSchedule
 * @request
 *  body:
 *    {input: string}
 *  params: n/a
 *  query params: n/a
 * @response created mealSchedule
 *   {userID: string,
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
router.put('/', updateMealScheduleForUser);

module.exports = router;
