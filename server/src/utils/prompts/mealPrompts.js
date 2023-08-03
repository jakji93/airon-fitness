const mealCreationPrompt = (user) => `
  Imagine a ${user.age} year old ${user.gender}, 
  weight ${user.weight}${user.weightUnit} (assume kilograms if no unit provided), 
  height ${user.height}${user.heightUnit} (assume centimeters if no unit provided),
  has fitness experience of: ${user.fitness}, 
  has body fat percentage of: ${user.bodyFat}, and
  has muscle mass percentage of: ${user.muscleMass}. 

  Their fitness and health goals are: ${user.goals}.
  They have the following dietary restrictions: ${user.dietRestrictions},
  They have the following health conditions: ${user.healthConditions},
  They have the following allergies: ${user.allergies},

  Now, create a weekly meal plan including breakfast, snack1 (strictly use snack1 in respond), 
  lunch, snack2 (strictly use snack2 in respond) and dinner in JSON form.
  In the JSON, include the total amount of nutritional macros (as nutrition_totals) for each day provided by the meal plan. 
  Don't include the nutritional macros per food item. 
  Don't include any Note. For null values use 0 instead.

  To be explicit, the JSON should be formatted like so:
  {
    {Monday:
      {breakfast: string,
        snack1: string,
        lunch: string,
        snack2: string
        dinner: string
        nutrition_totals: {
        calories: number,
        carbohydrates: number,
        protein: number,
        fat: number
        }
      }
      Tuesday:...
      Wednesday:...
      ...}
  }`;

const mealUpdatePrompt = (user, inputs, schedule) => `
  Imagine that you are updating a client's diet/meal schedule.

  Here is some information about the client:
  Allergies (make sure the schedule is free of these allergen risks): ${user.allergies}
  Goals: ${user.goals}
  Health Conditions: ${user.healthConditions}
  Diet Restrictions: ${user.dietRestrictions}

  Here are the additional requirements or changes that the user has requested:
  ${inputs}

  Please take the following existing JSON meal schedule and make the necessary tweaks based on the additional requirements or changes:
  ${schedule}

  Please make the necessary modifications and return ONLY the updated meal schedule in the same JSON format, do not comment.
  In the JSON, include the total amount of nutritional macros (as nutrition_totals) for each day provided by the meal plan. 
  Don't include the nutritional macros per food item. 
  Don't include any Note. For null values use 0 instead.

  To be explicit, the JSON should be formatted like so:
  {
    {Monday:
      {breakfast: string,
        snack1: string,
        lunch: string,
        snack2: string
        dinner: string
        nutrition_totals: {
        calories: number,
        carbohydrates: number,
        protein: number,
        fat: number
        }
      }
      Tuesday:...
      Wednesday:...
      ...}
  }`;

const mealPrompt = (mode, user, inputs, schedule) => [
  {
    role: 'system',
    content: 'You are a fitness expert and dietary specialist.',
  },
  {
    role: 'user',
    content: mode === 'create' ? mealCreationPrompt(user) : mealUpdatePrompt(user, inputs, schedule),
  },
];

module.exports = {
  mealPrompt,
};
