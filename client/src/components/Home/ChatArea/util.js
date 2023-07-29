export const createWorkoutString = (schedule, newMessages) => {
  Object.entries(schedule).forEach(([day, exercises]) => {
    let workoutString = '';
    const exercisesArray = Object.entries(exercises);
    let workout = `${day}\n`;

    exercisesArray[0][1].forEach((ex, idx) => {
      workout += `Exercise ${idx + 1}:  ${ex.exercise} ${ex.reps} Reps, ${ex.sets} Sets\n`;
    });

    workoutString += workout;
    newMessages.push({ content: workoutString, isSelf: false });
  });
};

export const createMealString = (schedule, newMessages) => {
  Object.entries(schedule.schedule).forEach(([day, meals]) => {
    const meal = Object.entries(meals);
    newMessages.push({ content: `${day}\n`, isSelf: false });

    meal.forEach((ex, idx) => {
      newMessages.push({ content: idx !== 5 ? `${ex[0]}: ${ex[1]}\n` : '', isSelf: false });
    });
  });
};

export const starterOptions = ['Edit Profile', 'Generate Schedules', 'View Meal Plan', 'View Workout Plan'];
export const starterLabel = 'Choose an option';
