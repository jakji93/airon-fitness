import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import WorkoutStatesEnum from './WorkoutFlowStates';
import { WorkoutScheduleShape } from './WorkoutPropTypes';

export default function GuidedWorkout({ workoutData, onNext }) {
  return (
    <Box>
      <Typography variant="h1" color="#ffffff" sx={{ color: '#ffffff' }}>
        Guided Workouts Component
        <pre>{JSON.stringify(workoutData, null, 2)}</pre>
      </Typography>
      <Button onClick={() => onNext(WorkoutStatesEnum.SELECT_WORKOUT)} variant="outlined">
        CHOOSE ANOTHER WORKOUT
      </Button>
      <Button href="/app" variant="outlined">
        BACK TO HOME
      </Button>
    </Box>

  );
}

GuidedWorkout.propTypes = {
  workoutData: WorkoutScheduleShape.isRequired,
  onNext: PropTypes.func.isRequired,
};
