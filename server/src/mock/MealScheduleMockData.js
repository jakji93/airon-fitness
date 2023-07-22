// {userInfoID: string,
//   schedule:
//     {Monday:
//       {breakfast: string,
//       snack1: string,
//       lunch: string,
//       snack2: string
//       dinner: string
//       nutrition_totals: {
//         calories: number,
//         carbohydrates: number,
//         protein: number,
//         fat: number
//       }
//     }
//    Tuesday:...
//    Wednesday:...
//    ...}
//    inputs: [string]}
const mealScheduleMockMTWTF = {
  Monday: {
    breakfast: 'Oatmeal with berries and a sprinkle of nuts',
    snack1: 'Greek yogurt with cucumber slices',
    lunch: 'Grilled chicken breast with mixed vegetables',
    snack2: 'Apple slices with almond butter',
    dinner: 'Salmon with quinoa and steamed broccoli',
    nutrition_totals: {
      calories: 1500,
      protein: 79,
      carbohydrates: 140,
      fat: 48,
    },
  },
  Tuesday: {
    breakfast: 'Egg white omelette with spinach and tomatoes',
    snack1: 'Protein shake with almond milk',
    lunch: 'Turkey wrap with whole wheat tortilla, lettuce, and tomato',
    snack2: 'Carrot sticks with hummus',
    dinner: 'Grilled lean steak with sweet potato and roasted asparagus',
    nutrition_totals: {
      calories: 1200,
      protein: 104,
      carbohydrates: 99,
      fat: 39,
    },
  },
  Wednesday: {
    breakfast: 'Whole grain toast with avocado and poached eggs',
    snack1: 'Mixed berries',
    lunch: 'Quinoa salad with grilled chicken, bell peppers, and feta cheese',
    snack2: 'Celery sticks with peanut butter',
    dinner: 'Baked cod with brown rice and sautéed zucchini',
    nutrition_totals: {
      calories: 1450,
      protein: 133,
      carbohydrates: 88,
      fat: 64,
    },
  },
  Thursday: {
    breakfast: 'Greek yogurt with granola and sliced bananas',
    snack1: 'Protein bar',
    lunch: 'Shrimp stir-fry with mixed vegetables and brown rice',
    snack2: 'Edamame',
    dinner: 'Grilled tofu with quinoa and roasted Brussels sprouts',
    nutrition_totals: {
      calories: 1650,
      protein: 98,
      carbohydrates: 185,
      fat: 46,
    },
  },
  Friday: {
    breakfast: 'Smoothie with spinach, banana, almond milk, and protein powder',
    snack1: 'Cucumber slices with tzatziki sauce',
    lunch: 'Grilled chicken breast with quinoa and steamed broccoli',
    snack2: 'Mixed nuts',
    dinner: 'Grilled salmon with sweet potato fries and grilled asparagus',
    nutrition_totals: {
      calories: 1580,
      protein: 92,
      carbohydrates: 128,
      fat: 62,
    },
  },
};

const mealScheduleMockMTWTFSS = {
  Monday: {
    breakfast: 'Omelette with vegetables (spinach, bell peppers, onions) and a side of whole wheat toast',
    snack1: 'Greek yogurt with mixed berries',
    lunch: 'Grilled chicken breast with quinoa and steamed broccoli',
    snack2: 'Protein shake with almond milk',
    dinner: 'Salmon fillet with roasted sweet potatoes and asparagus',
    nutrition_totals: {
      calories: 1630,
      protein: 110,
      carbohydrates: 120,
      fat: 65,
    },
  },
  Tuesday: {
    breakfast: 'Avocado toast on whole grain bread with a side of sliced tomatoes',
    snack1: 'Hard-boiled eggs',
    lunch: 'Turkey lettuce wraps with hummus and cucumber slices',
    snack2: 'Mixed nuts',
    dinner: 'Lean beef stir-fry with brown rice and mixed vegetables',
    nutrition_totals: {
      calories: 1448,
      protein: 74.3,
      carbohydrates: 103.6,
      fat: 82.6,
    },
  },
  Wednesday: {
    breakfast: 'Smoothie made with spinach, banana, almond milk, and protein powder',
    snack1: 'Apple slices with almond butter',
    lunch: 'Grilled shrimp salad with mixed greens, cherry tomatoes, and balsamic vinaigrette',
    snack2: 'Cottage cheese with pineapple chunks',
    dinner: 'Baked chicken thighs with roasted Brussels sprouts and quinoa',
    nutrition_totals: {
      calories: 1226,
      protein: 155,
      carbohydrates: 131,
      fat: 51,
    },
  },
  Thursday: {
    breakfast: 'Vegetable omelette with a side of whole wheat toast',
    snack1: 'Greek yogurt with honey',
    lunch: 'Salmon salad with mixed greens, avocado, and lemon dressing',
    snack2: 'Protein bar',
    dinner: 'Grilled tofu with stir-fried vegetables and brown rice',
    nutrition_totals: {
      calories: 1700,
      protein: 100,
      carbohydrates: 140,
      fat: 77,
    },
  },
  Friday: {
    breakfast: 'Quinoa porridge with almond milk, topped with berries and nuts',
    snack1: 'Carrot sticks with hummus',
    lunch: 'Chicken and vegetable stir-fry with brown rice noodles',
    snack2: 'Trail mix',
    dinner: 'Baked cod with roasted sweet potatoes and green beans',
    nutrition_totals: {
      calories: 1550,
      protein: 80,
      carbohydrates: 175,
      fat: 61,
    },
  },
  Saturday: {
    breakfast: 'Whole grain pancakes with sliced bananas and a drizzle of honey',
    snack1: 'Protein smoothie with almond milk and spinach',
    lunch: 'Turkey and avocado wrap with whole wheat tortilla',
    snack2: 'Greek yogurt with granola',
    dinner: 'Grilled steak with roasted vegetables and quinoa',
    nutrition_totals: {
      calories: 1750,
      protein: 98,
      carbohydrates: 180,
      fat: 65,
    },
  },
  Sunday: {
    breakfast: 'Egg white omelette with spinach, mushrooms, and feta cheese',
    snack1: 'Mixed berries with cottage cheese',
    lunch: 'Quinoa salad with grilled chicken, cherry tomatoes, and cucumber',
    snack2: 'Rice cakes with almond butter',
    dinner: 'Baked salmon with steamed asparagus and wild rice',
    nutrition_totals: {
      calories: 1380,
      protein: 105,
      carbohydrates: 114,
      fat: 57,
    },
  },
};

module.exports = {
  mealScheduleMockMTWTF,
  mealScheduleMockMTWTFSS,
};
