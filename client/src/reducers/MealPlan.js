/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialPlan = {
  Monday: [{
    itemOne: '2 boiled eggs',
    itemTwo: '1 whole-grain toast',
    itemThree: 'mixed berries',
    itemFour: 'sliced almonds',
    itemFive: '1 cup of black coffee',
  },
  {
    itemOne: '150g grilled chicken breast',
    itemTwo: '1 cup of cooked rice',
    itemThree: 'steamed vegetables',
    itemFour: 'mixed green salad with light dressing',
    itemFive: '1 small low-fat yogurt',
  },
  {
    itemOne: '150g baked salmon fillet',
    itemTwo: '1/2 cup cooked quinoa',
    itemThree: 'roasted sweet potatoes',
    itemFour: 'sautéed spinach or kale with garlic',
    itemFive: '1 cup of herbal tea',
  }],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [],
};

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
      state.plan = fitnessPlanSlice.getInitialState().plan;
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
