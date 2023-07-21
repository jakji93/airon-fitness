const express = require('express');
const { getMealScheduleByUser, createMealScheduleForUser, updateMealScheduleForUser } = require('../controllers/mealSchedule/mealScheduleController');

const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

/**
 * @desc get meal schedule for user (Get userID from JWT token)
 * @access Private
 * @route GET /mealSchedule
 * @request
 *  body: n/a
 *  params: n/a
 *  query params: n/a
 * @response mealSchedule for user
 *   {userInfoID: string,
 *    schedule:
 *      {Monday:
 *        {breakfast: string,
 *         snack1: string,
 *         lunch: string,
 *         snack2: string
 *         dinner: string
 *         nutrition_totals: {
 *          calories: number,
 *          carbohydrates: number,
 *          protein: number,
 *          fat: number
 *          }
 *        }
 *       Tuesday:...
 *       Wednesday:...
 *       ...}
 *    inputs: [string]}
 */
router.get('/', protect, getMealScheduleByUser);

/**
 * @desc create meal schedule for user (Get userID from JWT token)
 * @access Private
 * @route POST /mealSchedule
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
 *         dinner: string
 *         nutrition_totals: {
 *          calories: number,
 *          carbohydrates: number,
 *          protein: number,
 *          fat: number
 *          }
 *        }
 *       Tuesday:...
 *       Wednesday:...
 *       ...}}
 *    inputs: [string]}
 */
router.post('/', protect, createMealScheduleForUser);

/**
 * @desc update meal schedule for user (Get userID from JWT token)
 * @access Private
 * @route PUT /mealSchedule
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
 *         dinner: string
 *         nutrition_totals: {
 *          calories: number,
 *          carbohydrates: number,
 *          protein: number,
 *          fat: number
 *          }
 *        }
 *       Tuesday:...
 *       Wednesday:...
 *       ...}}
 *    inputs: [string]}
 */
router.put('/', protect, updateMealScheduleForUser);

module.exports = router;
