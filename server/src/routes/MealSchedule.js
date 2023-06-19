const express = require('express');
const router = express.Router();

const scheudle = {
  Monday: {
    breakfast: "Oatmeal with berries and a sprinkle of nuts",
    snack1: "Greek yogurt with cucumber slices",
    lunch: "Grilled chicken breast with mixed vegetables",
    snack2: "Apple slices with almond butter",
    dinner: "Salmon with quinoa and steamed broccoli",
  },
  Tuesday: {
    breakfast: "Egg white omelette with spinach and tomatoes",
    snack1: "Protein shake with almond milk",
    lunch: "Turkey wrap with whole wheat tortilla, lettuce, and tomato",
    snack2: "Carrot sticks with hummus",
    dinner: "Grilled lean steak with sweet potato and roasted asparagus",
  },
  Wednesday: {
    breakfast: "Whole grain toast with avocado and poached eggs",
    snack1: "Mixed berries",
    lunch: "Quinoa salad with grilled chicken, bell peppers, and feta cheese",
    snack2: "Celery sticks with peanut butter",
    dinner: "Baked cod with brown rice and sautéed zucchini",
  },
  Thursday: {
    breakfast: "Greek yogurt with granola and sliced bananas",
    snack1: "Protein bar",
    lunch: "Shrimp stir-fry with mixed vegetables and brown rice",
    snack2: "Edamame",
    dinner: "Grilled tofu with quinoa and roasted Brussels sprouts",
  },
  Friday: {
    breakfast: "Smoothie with spinach, banana, almond milk, and protein powder",
    snack1: "Cucumber slices with tzatziki sauce",
    lunch: "Grilled chicken breast with quinoa and steamed broccoli",
    snack2: "Mixed nuts",
    dinner: "Grilled salmon with sweet potato fries and grilled asparagus",
  }
};

const schedules = [
  {
    userID: "1",
    schedule: scheudle
  }
];

router.get('/:userID', (req, res) => {
  const foundItem = schedules.find(item => item.userID === req.params.userID);
  if (!foundItem) return res.status(404).send({ message: 'Item not found' });
  res.send(foundItem);
});

router.post('/', (req, res) => {
  if(!req.body.schedule) {
    return res.status(400).send({message: "Missing Payload"});
  }
  const item = {userID: req.body.userID, schedule: req.body.schedule};
  schedules.push(item);
  return res.send(item);
});

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