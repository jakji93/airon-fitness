const axios = require('axios');
const { mealPrompt } = require('./prompts/mealPrompts');
const { workoutPrompt } = require('./prompts/workoutPrompts');

const apiKey = process.env.GPT_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${apiKey}`,
};

async function generateMealSchedule(userData) {
  const response = await axios.post(apiUrl, {
    model: 'gpt-3.5-turbo',
    messages: mealPrompt('create', userData),
    temperature: 0,
  }, { headers, timeout: 500000 });

  return response.data.choices[0].message.content;
}

async function updateMealSchedule(userData, inputs, schedule) {
  const response = await axios.post(apiUrl, {
    model: 'gpt-3.5-turbo',
    messages: mealPrompt('update', userData, inputs, schedule),
    temperature: 0,
  }, { headers, timeout: 500000 });

  return response.data.choices[0].message.content;
}

async function generateWorkoutSchedule(userData) {
  const response = await axios.post(apiUrl, {
    model: 'gpt-3.5-turbo',
    messages: workoutPrompt('create', userData),
    temperature: 0,
  }, { headers, timeout: 500000 });

  return response.data.choices[0].message.content;
}

async function updateWorkoutSchedule(userData, inputs, schedule) {
  const response = await axios.post(apiUrl, {
    model: 'gpt-3.5-turbo',
    messages: workoutPrompt('update', userData, inputs, schedule),
    temperature: 0,
  }, { headers, timeout: 500000 });

  return response.data.choices[0].message.content;
}

module.exports = {
  generateWorkoutSchedule,
  updateWorkoutSchedule,
  generateMealSchedule,
  updateMealSchedule,
};
