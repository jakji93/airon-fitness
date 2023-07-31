/* eslint-disable no-restricted-syntax */
import {
  Box, Button, Typography, Paper,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import WorkoutStatesEnum from './WorkoutFlowStates';
import { WorkoutScheduleShape } from './WorkoutPropTypes';

export default function GuidedWorkout({ sessionDay, workoutData, onNext }) {
  const workouts = Object.entries(workoutData.schedule)
    .map(([day, { exercises }]) => ({
      [day]: exercises,
    }));

  const getWorkoutForDay = (day) => {
    const foundWorkout = workouts.find((workoutObj) => day in workoutObj);
    return foundWorkout ? foundWorkout[day] : null;
  };

  return (
    <Box>
      <Paper>
        <Button onClick={() => onNext(WorkoutStatesEnum.SELECT_WORKOUT)} variant="outlined">
          CHOOSE ANOTHER WORKOUT
        </Button>
        <Button href="/app" variant="outlined">
          BACK TO HOME
        </Button>
      </Paper>
      <Typography variant="h6" color="#ffffff" sx={{ color: '#ffffff' }}>
        Guided Workouts Component, {sessionDay}
        {/* <pre>{JSON.stringify(workouts, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(sessionDay, null, 2)}</pre> */}
        <pre>{JSON.stringify(getWorkoutForDay(sessionDay), null, 2)}</pre>

      </Typography>
    </Box>

  );
}

GuidedWorkout.propTypes = {
  sessionDay: PropTypes.string.isRequired,
  workoutData: WorkoutScheduleShape.isRequired,
  onNext: PropTypes.func.isRequired,
};
