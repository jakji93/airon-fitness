/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialPlan = {
  mealPlan: {
    Monday: {
      breakfast: 'Omelette with vegetables (spinach, bell peppers, onions) and a side of whole wheat toast',
      snack1: 'Greek yogurt with mixed berries',
      lunch: 'Grilled chicken breast with quinoa and steamed broccoli',
      snack2: 'Protein shake with almond milk',
      dinner: 'Salmon fillet with roasted sweet potatoes and asparagus',
    },
    Tuesday: {
      breakfast: 'Avocado toast on whole grain bread with a side of sliced tomatoes',
      snack1: 'Hard-boiled eggs',
      lunch: 'Turkey lettuce wraps with hummus and cucumber slices',
      snack2: 'Mixed nuts',
      dinner: 'Lean beef stir-fry with brown rice and mixed vegetables',
    },
    Wednesday: {
      breakfast: 'Smoothie made with spinach, banana, almond milk, and protein powder',
      snack1: 'Apple slices with almond butter',
      lunch: 'Grilled shrimp salad with mixed greens, cherry tomatoes, and balsamic vinaigrette',
      snack2: 'Cottage cheese with pineapple chunks',
      dinner: 'Baked chicken thighs with roasted Brussels sprouts and quinoa',
    },
    Thursday: {
      breakfast: 'Vegetable omelette with a side of whole wheat toast',
      snack1: 'Greek yogurt with honey',
      lunch: 'Salmon salad with mixed greens, avocado, and lemon dressing',
      snack2: 'Protein bar',
      dinner: 'Grilled tofu with stir-fried vegetables and brown rice',
    },
    Friday: {
      breakfast: 'Quinoa porridge with almond milk, topped with berries and nuts',
      snack1: 'Carrot sticks with hummus',
      lunch: 'Chicken and vegetable stir-fry with brown rice noodles',
      snack2: 'Trail mix',
      dinner: 'Baked cod with roasted sweet potatoes and green beans',
    },
    Saturday: {
      breakfast: 'Whole grain pancakes with sliced bananas and a drizzle of honey',
      snack1: 'Protein smoothie with almond milk and spinach',
      lunch: 'Turkey and avocado wrap with whole wheat tortilla',
      snack2: 'Greek yogurt with granola',
      dinner: 'Grilled steak with roasted vegetables and quinoa',
    },
    Sunday: {
      breakfast: 'Egg white omelette with spinach, mushrooms, and feta cheese',
      snack1: 'Mixed berries with cottage cheese',
      lunch: 'Quinoa salad with grilled chicken, cherry tomatoes, and cucumber',
      snack2: 'Rice cakes with almond butter',
      dinner: 'Baked salmon with steamed asparagus and wild rice',
    },
  },
};

// const initialState = {
//   plan: null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// };

// TODO: when api setup, change the initial state to empty
const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState: {
    created: false,
    loading: false,
    error: '',
    plan: initialPlan,
  },
  reducers: {
    FETCH_MEAL_PLAN_REQUESTED: (state) => {
      state.loading = true;
    },
    FETCH_MEAL_PLAN_SUCCESS: (state, action) => {
      state.created = true;
      state.loading = false;
      state.plan = action.payload;
      state.error = '';
    },
    FETCH_MEAL_PLAN_ERROR: (state, action) => {
      state.loading = false;
      state.plan = mealPlanSlice.getInitialState().plan;
      state.error = action.payload;
    },
  },
});

export const {
  FETCH_MEAL_PLAN_REQUESTED,
  FETCH_MEAL_PLAN_SUCCESS,
  FETCH_MEAL_PLAN_ERROR,
} = mealPlanSlice.actions;

export default mealPlanSlice.reducer;
