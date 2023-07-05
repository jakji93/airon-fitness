const workoutCreationPrompt = (user) => `Imagine a ${user.age} year old ${user.sex}, 
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
            Don't include any notes. For null values use 0 instead.`;
const workoutUpdatePrompt = (user, inputs, schedule) => `You are a dietician that is given the task to update a client's schedule.

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
