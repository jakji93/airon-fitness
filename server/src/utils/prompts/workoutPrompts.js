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
            Don't include any notes. For null values use 0 instead.`;
  };

  module.exports = {
    workoutPrompt,
  }