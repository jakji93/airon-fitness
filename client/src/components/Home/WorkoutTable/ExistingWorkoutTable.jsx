import {
  Grid,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import WorkoutBrowserCarousel from './WorkoutBrowserCarousel';

export default function ExistingWorkoutTable() {
  const { workoutSchedule } = useSelector(
    (state) => state.workoutAndMealSchedule,
  );

  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ p: 2 }}>
      <WorkoutBrowserCarousel workoutData={workoutSchedule} />
    </Grid>
  );
}
