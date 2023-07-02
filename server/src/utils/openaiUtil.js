const axios = require('axios');
const { mealPrompt } = require('./prompts/mealPrompts');
const { workoutPrompt } = require('./prompts/workoutPrompts');
const apiKey = process.env.GPT_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`,
};

async function generateMealSchedule(user) {
  const response = await axios.post(apiUrl, {
    model: "gpt-3.5-turbo",
    messages: mealPrompt(user, 'create'),
    temperature: 0
}, { headers, timeout: 500000 });

  return response.data.choices[0].message.content;
}

async function updateMealSchedule(inputs, schedule) {
  const generatedMessage = mealPrompt({}, 'update', inputs, schedule);
  console.log(generatedMessage);

  const response = await axios.post(apiUrl, {
    model: "gpt-3.5-turbo",
    messages: generatedMessage,
    temperature: 0
}, { headers, timeout: 500000 });

  return response.data.choices[0].message.content;
}



// TODO: update workout schedule logic to match above 

const message = (user, mode) => {
  return [
    {
      role: "system",
      content: "You are a fitness expert."
    },
    {
      role: "user",
      content: mode === 'workout' ? workoutPrompt(user) : mealCreationPrompt(user)
    }
  ]
}

async function generateWorkoutSchedule(user) {
  const response = await axios.post(apiUrl, {
    model: "gpt-3.5-turbo",
    messages: message(user, 'workout'),
    temperature: 0
}, { headers, timeout: 500000 });

  return response.data.choices[0].message.content;
}

module.exports = {
  generateWorkoutSchedule,
  generateMealSchedule,
  updateMealSchedule
}