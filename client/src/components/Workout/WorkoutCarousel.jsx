import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import WorkoutStatesEnum from './WorkoutFlowStates';

export default function WorkoutCarousel({ onNext }) {
  return (
    <Box>
      <Typography variant="h1">
        Workout Selection Carousel
      </Typography>
      <Button onClick={() => onNext(WorkoutStatesEnum.IN_SESSION)} variant="outlined">
        START WORKOUT
      </Button>
    </Box>

  );
}

WorkoutCarousel.propTypes = {
  onNext: PropTypes.func.isRequired,
};
