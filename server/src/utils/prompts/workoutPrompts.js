const workoutCreationPrompt = (user) => `
  Imagine a ${user.age} year old ${user.gender}, 
  weight ${user.weight} ${user.weightUnit}, 
  BMI of ${user.BMI}, 
  has ${user.experience} fitness level, 
  with ${user.healthConditions}, 
  height ${user.height} cm. 

  Time availability of ${user.weeklyAvailability} days per week 
  with each session lasting ${user.exerciseDuration} minutes. 
  Has access to ${user.equipment}. 
  
  Please create a weekly workout schedule for ${user.goals} 
  including exercises, sets and reps if applicable to the exercise, 
  rest between sets in seconds if applicable to the exercise, 
  duration of the exercise in minutes if applicable to the exercise, 
  and recommended intensity as a percentage in JSON form. 
  Don't include any notes. For null values use 0 instead.`;

const workoutUpdatePrompt = (user, inputs, schedule) => `
  Imagine that you are updating a client's workout schedule.

  Here is some information about the client:
  Allergies (make sure the schedule is free of these allergen risks): ${user.allergies}
  Goals: ${user.goals}
  Health Conditions: ${user.healthConditions}
  Diet Restrictions: ${user.dietRestrictions}

  Here are the additional requirements or changes that the user has requested:
  ${inputs}

  Please take the following existing JSON workout schedule and make the necessary tweaks based on the additional requirements or changes:
  ${schedule}

  Please make the necessary modifications and return the updated workout schedule in the same JSON format. Thank you!
  Don't include Note. For null values use 0 instead.`;

const workoutPrompt = (mode, user, inputs, schedule) => [
  {
    role: 'system',
    content: 'You are a fitness expert and dietary specialist.',
  },
  {
    role: 'user',
    content: mode === 'create' ? workoutCreationPrompt(user) : workoutUpdatePrompt(user, inputs, schedule),
  },
];

module.exports = {
  workoutPrompt,
  workoutUpdatePrompt,
};
