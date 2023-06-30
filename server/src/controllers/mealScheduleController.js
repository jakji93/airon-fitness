const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const MealSchedule = require('../models/MealScheduleModel');
const { mockMealSchedule } = require('../mock/MealScheduleMockData');

/**
 * @desc    get meal schedule for user (userID)
 * @route   GET /mealSchedule
 * @access  Private
 */
const getMealScheduleByUser = asyncHandler(async (req, res) => {
  const {
    _userInfoID, schedule, inputs
  } = await MealSchedule.findOne({ _userInfoID: req.user._id });

  if (!foundItem) {
    res.status(404).json({ message: 'Meal schedule not found' })
  } else {
    res.status(200).json({
      userInfoID: _userInfoID,
      schedule,
      inputs
    })
  }
});

/**
 * @desc    create meal schedule for user (userID)
 * @route   POST /mealSchedule
 * @access  Private
 */
const createMealScheduleForUser = asyncHandler(async (req, res) => {
  console.log("creating meal schedule...");
  const id = req.user._id;
  console.log("the id is: " + id);

  // Check if user already has a meal schedule
  const mealScheduleExists = await MealSchedule.findOne({ userInfoID: id });

  if (mealScheduleExists) {
    res.status(400).json({ message: 'Meal schedule already exists' });
    throw new Error('Meal schedule already exists');
  }

  // Create meal in MongoDB
  const mealSchedule = await MealSchedule.create({
    _userInfoID: id,
    // schedule: mockMealSchedule,
    // schedule: {},
    schedule: {
      Monday: {
        breakfast: 'Oatmeal with berries and a sprinkle of nuts',
        snack1: 'Greek yogurt with cucumber slices',
        lunch: 'Grilled chicken breast with mixed vegetables',
        snack2: 'Apple slices with almond butter',
        dinner: 'Salmon with quinoa and steamed broccoli',
      },
      Tuesday: {
        breakfast: 'Egg white omelette with spinach and tomatoes',
        snack1: 'Protein shake with almond milk',
        lunch: 'Turkey wrap with whole wheat tortilla, lettuce, and tomato',
        snack2: 'Carrot sticks with hummus',
        dinner: 'Grilled lean steak with sweet potato and roasted asparagus',
      },
      Wednesday: {
        breakfast: 'Whole grain toast with avocado and poached eggs',
        snack1: 'Mixed berries',
        lunch: 'Quinoa salad with grilled chicken, bell peppers, and feta cheese',
        snack2: 'Celery sticks with peanut butter',
        dinner: 'Baked cod with brown rice and sautéed zucchini',
      },
      Thursday: {
        breakfast: 'Greek yogurt with granola and sliced bananas',
        snack1: 'Protein bar',
        lunch: 'Shrimp stir-fry with mixed vegetables and brown rice',
        snack2: 'Edamame',
        dinner: 'Grilled tofu with quinoa and roasted Brussels sprouts',
      },
      Friday: {
        breakfast: 'Smoothie with spinach, banana, almond milk, and protein powder',
        snack1: 'Cucumber slices with tzatziki sauce',
        lunch: 'Grilled chicken breast with quinoa and steamed broccoli',
        snack2: 'Mixed nuts',
        dinner: 'Grilled salmon with sweet potato fries and grilled asparagus',
      },
    },
    inputs: [],
  });

  if (mealSchedule) {
    res.status(201).json({
      userInfoID: mealSchedule.id,
      schedule: mealSchedule.schedule,
      inputs: mealSchedule.inputs,
    })
  }

  res.status(400).json({ message: 'invalid meal schedule data' });
  throw new Error('invalid meal schedule data');
});

/**
 * @desc    update meal schedule for user (userID)
 * @route   PUT /mealSchedule
 * @access  Private
 */
const updateMealScheduleForUser = (req, res) => {
  // const foundItemIndex = schedules.findIndex((item) => item.userID === req.params.userID);

  // if (foundItemIndex < 0) return res.status(404).send({ message: 'Item not found' });
  // if (!req.body.schedule) {
  //   return res.status(400).send({ message: 'Missing paylod' });
  // }
  // schedules[foundItemIndex].schedule = req.body.schedule;
  // return res.send(schedules[foundItemIndex]);
};

module.exports = {
  getMealScheduleByUser,
  createMealScheduleForUser,
  updateMealScheduleForUser,
};
