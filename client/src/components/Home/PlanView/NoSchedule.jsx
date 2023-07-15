import {
  Button, Grid, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import { createWorkoutAndMealSchedule } from '../../../reducers/WorkoutAndMealSchedule';

export default function NoSchedule() {
  const dispatch = useDispatch();

  const createSchedules = () => dispatch(createWorkoutAndMealSchedule());

  return (
    <Grid container alignItems="center" sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h5" component="span" color="text.secondary">
          Get started by creating a plan!
        </Typography>
      </Grid>
      <Button variant="outlined" onClick={createSchedules}>Create My Plans</Button>
    </Grid>
  );
}
