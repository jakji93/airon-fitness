import PropTypes from 'prop-types';

const ExerciseShape = PropTypes.shape({
  exercise: PropTypes.string.isRequired,
  sets: PropTypes.number.isRequired,
  reps: PropTypes.number.isRequired,
  rest: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  intensity: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
});

const DayOfWeekShape = PropTypes.shape({
  exercises: PropTypes.arrayOf(ExerciseShape).isRequired,
  total_calories: PropTypes.number.isRequired,
});

const WorkoutScheduleShape = PropTypes.shape({
  userInfoID: PropTypes.string.isRequired,
  schedule: PropTypes.shape({
    Monday: DayOfWeekShape.isRequired,
    Tuesday: DayOfWeekShape.isRequired,
    Wednesday: DayOfWeekShape.isRequired,
    Thursday: DayOfWeekShape.isRequired,
    Friday: DayOfWeekShape.isRequired,
    Saturday: DayOfWeekShape.isRequired,
    Sunday: DayOfWeekShape.isRequired,
  }).isRequired,
  inputs: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export {
  ExerciseShape,
  DayOfWeekShape,
  WorkoutScheduleShape,
};
