import {
  Card, Grid, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExistingWorkoutTable from './ExistingWorkoutTable';
import NoWorkoutTable from './NoWorkoutTable';
import { resetWorkoutAndMealScheduleStates } from '../../../reducers/WorkoutAndMealSchedule';

export default function WorkoutTable() {
  const dispatch = useDispatch();
  const {
    workoutSchedule, isError, isSuccess, message,
  } = useSelector((state) => state.workoutAndMealSchedule);

  useEffect(() => {
    if (isError) {
      dispatch(resetWorkoutAndMealScheduleStates());
    }

    if (isSuccess) {
      dispatch(resetWorkoutAndMealScheduleStates());
    }
  }, [workoutSchedule, isError, isSuccess, message, dispatch]);

  return (
    <div>
      <Grid container component={Card} sx={{ p: 2, borderRadius: '10px' }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Workout Table
        </Typography>
        {workoutSchedule ? <ExistingWorkoutTable /> : <NoWorkoutTable />}
      </Grid>
    </div>
  );
}
