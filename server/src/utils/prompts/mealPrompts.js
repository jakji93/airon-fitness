const mealPrompt = (mode, user, inputs, schedule) => {
  return [
    {
      role: "system",
      content: "You are a fitness expert and dietary specialist."
    },
    {
      role: "user",
      content: mode === 'create' ? mealCreationPrompt(user) : mealUpdatePrompt(user, inputs, schedule)
    }
  ]
}

const mealCreationPrompt = (user) => {
  return `Imagine a ${user.age} year old ${user.gender}, 
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
          lunch, snack2 (strictly use snack2 in respond) and dinner in JSON form. Don't include any Note. For null values use 0 instead.`  
  }

const mealUpdatePrompt = (user, inputs, schedule) => {
    return `You are a dietician that is given the task to update a client's schedule.

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
            Don't include Note. For null values use 0 instead.`  
  }

  module.exports = {
    mealPrompt,
  }