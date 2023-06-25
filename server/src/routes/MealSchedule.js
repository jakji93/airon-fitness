const express = require('express');
const { getMealScheduleByUser, createMealScheduleForUser, updateMealScheduleForUser } = require('../controllers/mealScheduleController');

const router = express.Router();

/**
 * @desc get meal schedule for user (userID)
 * @access Private
 * @route GET /mealSchedule
 * @request
 *  body: n/a
 *  params: userID
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
 *       ...}}
 */
router.get('/:userID', getMealScheduleByUser);

/**
 * @desc create meal schedule for user (userID)
 * @access Private
 * @route POST /mealSchedule
 * @request
 *  body:
 *    {userID: string,
 *    schedule:
 *      {Monday:
 *        {breakfast: string,
 *         snack1: string,
 *         lunch: string,
 *         snack2: string
 *         dinner: string}
 *        Tuesday:...
 *        Wednesday:...
 *        ...}}
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
 */
router.post('/', createMealScheduleForUser);

/**
 * @desc update meal schedule for user (userID)
 * @access Private
 * @route PUT /mealSchedule
 * @request
 *  body:
 *    {userID: string,
 *    schedule:
 *      {Monday:
 *        {breakfast: string,
 *         snack1: string,
 *         lunch: string,
 *         snack2: string
 *         dinner: string}
 *        Tuesday:...
 *        Wednesday:...
 *        ...}}
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
 */
router.put('/:userID', updateMealScheduleForUser);

module.exports = router;
