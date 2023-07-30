import PropTypes from 'prop-types';

const exerciseShape = PropTypes.shape({
  exercise: PropTypes.string.isRequired,
  sets: PropTypes.number.isRequired,
  reps: PropTypes.number.isRequired,
  rest: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  intensity: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
});

const dayOfWeekShape = PropTypes.shape({
  exercises: PropTypes.arrayOf(exerciseShape).isRequired,
  total_calories: PropTypes.number.isRequired,
});

const WorkoutScheduleShape = PropTypes.shape({
  userInfoID: PropTypes.string.isRequired,
  schedule: PropTypes.shape({
    Monday: dayOfWeekShape.isRequired,
    Tuesday: dayOfWeekShape.isRequired,
    Wednesday: dayOfWeekShape.isRequired,
    Thursday: dayOfWeekShape.isRequired,
    Friday: dayOfWeekShape.isRequired,
    Saturday: dayOfWeekShape.isRequired,
    Sunday: dayOfWeekShape.isRequired,
  }).isRequired,
  inputs: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export default WorkoutScheduleShape;
