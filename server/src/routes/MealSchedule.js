const express = require('express');
const { getMealScheduleByUser, createMealScheduleForUser, updateMealScheduleForUser } = require('../controllers/mealScheduleController');

const router = express.Router();
// const { schedule } = require('./mock/MealScheduleMockData');
const openAI = require('../utils/openaiUtil');

/**
 * @desc get meal schedule for user (Get userID from JWT token)
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
router.post('/:userID', async (req, res) => {
  const tempUser = {
    age: 25,
    sex: 'male',
    weight: '160',
    BMI: '19',
    fitness: 'high',
    healthConditions: 'asthma',
    height: '180',
    timePreference: '5 days per week',
    durationPreference: '60',
    equipmentAcess: 'dumbbells',
    goal: 'gaining muscle',
  };

  const mealSchedule = await MealSchedule.create({
    _userInfoID: id,
    schedule: generatedSchedule,
    inputs: [],
    // schedule: mockMealSchedule,
    // schedule: {},
    // schedule: {
    //   Monday: {
    //     breakfast: 'Oatmeal with berries and a sprinkle of nuts',
    //     snack1: 'Greek yogurt with cucumber slices',
    //     lunch: 'Grilled chicken breast with mixed vegetables',
    //     snack2: 'Apple slices with almond butter',
    //     dinner: 'Salmon with quinoa and steamed broccoli',
    //   },
    //   Tuesday: {
    //     breakfast: 'Egg white omelette with spinach and tomatoes',
    //     snack1: 'Protein shake with almond milk',
    //     lunch: 'Turkey wrap with whole wheat tortilla, lettuce, and tomato',
    //     snack2: 'Carrot sticks with hummus',
    //     dinner: 'Grilled lean steak with sweet potato and roasted asparagus',
    //   },
    //   Wednesday: {
    //     breakfast: 'Whole grain toast with avocado and poached eggs',
    //     snack1: 'Mixed berries',
    //     lunch: 'Quinoa salad with grilled chicken, bell peppers, and feta cheese',
    //     snack2: 'Celery sticks with peanut butter',
    //     dinner: 'Baked cod with brown rice and sautéed zucchini',
    //   },
    //   Thursday: {
    //     breakfast: 'Greek yogurt with granola and sliced bananas',
    //     snack1: 'Protein bar',
    //     lunch: 'Shrimp stir-fry with mixed vegetables and brown rice',
    //     snack2: 'Edamame',
    //     dinner: 'Grilled tofu with quinoa and roasted Brussels sprouts',
    //   },
    //   Friday: {
    //     breakfast: 'Smoothie with spinach, banana, almond milk, and protein powder',
    //     snack1: 'Cucumber slices with tzatziki sauce',
    //     lunch: 'Grilled chicken breast with quinoa and steamed broccoli',
    //     snack2: 'Mixed nuts',
    //     dinner: 'Grilled salmon with sweet potato fries and grilled asparagus',
    //   },
    // },
  });

  try {
    const schedule = await openAI.generateMealSchedule(tempUser);
    res.send(schedule);
  } catch (e) {
    res.sendStatus(500);
  }
});

/**
 * @desc update meal schedule for user (Get userID from JWT token)
 * @route PUT /mealSchedule
 * @request
 *  body:
 *    {input: string}
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
router.put('/:userID', (req, res) => {
  const foundItemIndex = schedules.findIndex(item => item.userID === req.params.userID);

  if (foundItemIndex < 0) return res.status(404).send({ message: 'Item not found' });
  if (!req.body.schedule) {
    return res.status(400).send({ message: 'Missing paylod' });
  }
  schedules[foundItemIndex].schedule = req.body.schedule;
  return res.send(schedules[foundItemIndex]);
});

module.exports = router;
