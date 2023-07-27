import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import WorkoutStatesEnum from './WorkoutFlowStates';

export default function GuidedWorkout({ onNext }) {
  return (
    <Box>
      <Typography variant="h1">
        Guided Workouts Component
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
  onNext: PropTypes.func.isRequired,
};
