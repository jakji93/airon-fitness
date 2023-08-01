import { createWorkoutSchedule, createMealSchedule } from '../../../reducers/WorkoutAndMealSchedule';

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

export const checkExistingWorkout = (state) => {
  if (Object.keys(state.workoutAndMealSchedule.workoutSchedule) === 0) {
    return createWorkoutSchedule(state);
  }
  return { type: 'NO_OP_ACTION' };
};

export const checkExistingMeal = (state) => {
  if (Object.keys(state.workoutAndMealSchedule.workoutSchedule) === 0) {
    return createMealSchedule(state);
  }
  return { type: 'NO_OP_ACTION' };
};

export const starterOptions = ['Edit Profile', 'Generate Schedules', 'View Meal Plan', 'View Workout Plan'];
export const starterLabel = 'Choose an option';
