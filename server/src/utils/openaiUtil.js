const axios = require('axios');

const apiKey = process.env.GPT_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`,
};

const message = (user, mode) => {
  return [
    {
      role: "system",
      content: "You are a fitness expert."
    },
    {
      role: "user",
      content: mode === 'workout' ? workoutPrompt(user) : mealPrompt(user)
    }
  ]
}

const workoutPrompt = (user) => {
  return `Imagine a ${user.age} year old ${user.sex}, 
          weight ${user.weight} pounds, 
          BMI of ${user.BMI}, 
          has ${user.fitness} fitness level, 
          with ${user.healthConditions}, 
          height ${user.height} cm. 
          Time availability of ${user.timePreference} 
          with each session lasting ${user.durationPreference} minutes. 
          Has access to ${user.equipmentAccess}. 
          Please create a weekly workout schedule for ${user.goal} 
          including exercises, sets and reps if applicable to the exercise, 
          rest between sets in seconds if applicable to the exercise, 
          duration of the exercise in minutes if applicable to the exercise, 
          and recommended intensity as a percentage in JSON form. 
          Don't include any Note. For null values use 0 instead.`;
};

const mealPrompt = (user) => {
  return `Imagine a ${user.age} year old ${user.sex}, weight ${user.weight} pounds, BMI of ${user.BMI}, has ${user.fitness} fitness level, with ${user.healthConditions}, height ${user.height}. Time availability of ${user.timePreference} with each session last ${user.durationPreference}. Has access to ${user.equipmentAccess}. With Dietary Restrictions of ${user.dietaryRestrictions}. Allergies to ${user.Allergies}. Please create a weekly meal plan for the following goals: ${user.goal} including breakfast, snack1 (strictly use snack1 in respond), lunch, snack2 (strictly use snack2 in respond) and dinner in JSON form. Don't include any Note or use null values.`
}

async function generateWorkoutSchedule(user) {
  const response = await axios.post(apiUrl, {
    model: "gpt-3.5-turbo",
    messages: message(user, 'workout'),
    temperature: 0
}, { headers, timeout: 500000 });

  return response.data.choices[0].message.content;
}

async function generateMealSchedule(user) {
  const response = await axios.post(apiUrl, {
    model: "gpt-3.5-turbo",
    messages: message(user, 'meal'),
    temperature: 0
}, { headers, timeout: 500000 });

  return response.data.choices[0].message.content;
}


module.exports = {
  generateWorkoutSchedule,
  generateMealSchedule
}