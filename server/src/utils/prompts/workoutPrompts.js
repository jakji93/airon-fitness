const workoutCreationPrompt = (user) => `
  Imagine a ${user.age} year old ${user.gender}, 
  weight ${user.weight} ${user.weightUnit} (assume kilograms if no unit provided), 
  height ${user.height} cm (assume centimeters if no unit provided),
  has fitness experience of: ${user.experience},
  has body fat percentage of: ${user.bodyFat},
  and has muscle mass percentage of" ${user.muscleMass},

  Time availability of ${user.weeklyAvailability} days per week 
  with each session lasting ${user.exerciseDuration} minutes. 
  Has access to ${user.equipment}. 

  The user has indicated the following health conditions: ${user.healthConditions}, 
  
  Please create a weekly workout schedule for ${user.goals} 
  including exercises, sets and reps if applicable to the exercise, 
  rest between sets in seconds if applicable to the exercise, 
  duration of the exercise in minutes if applicable to the exercise, 
  and recommended intensity as a percentage in JSON form. 
  In the JSON, include the total amount of calories burned (with "calories" as the key) 
  for each exercise provided by the workout plan.
  Then, add up the total number of calories and include it as "total_calories" for the day.
  Don't include any notes. For null values use 0 instead.
  
  To be explicit, the JSON should be formatted like so: 
  {
    {Monday: 
      {exercises: 
        [{exercise: string, 
          sets: number, 
          reps: number, 
          rest: number, 
          duration: number, 
          intensity: number,
          calories: number
          },
        ...
        ], 
      }
      total_calories: number
    }
    ...
   }`;

const workoutUpdatePrompt = (user, inputs, schedule) => `
  Imagine that you are updating a client's workout schedule.

  Here is some information about the client:
  Goals: ${user.goals}
  Health Conditions: ${user.healthConditions}

  Here are the additional requirements or changes that the user has requested:
  ${inputs}

  Please take the following existing JSON workout schedule and make the necessary tweaks based on the additional requirements or changes:
  ${schedule}

  Please make the necessary modifications and return the updated workout schedule in the same JSON format.
  In the JSON, include the total amount of calories burned (with "calories" as the key) 
  for each exercise provided by the workout plan.
  Then, add up the total number of calories and include it as "total_calories" for the day.
  Don't include any notes. For null values use 0 instead.
  
  To be explicit, the JSON should be formatted like so: 
  {
    {Monday: 
      {exercises: 
        [{exercise: string, 
          sets: number, 
          reps: number, 
          rest: number, 
          duration: number, 
          intensity: number,
          calories: number
          },
        ...
        ], 
      }
      total_calories: number
    }
    ...
   }`;

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
