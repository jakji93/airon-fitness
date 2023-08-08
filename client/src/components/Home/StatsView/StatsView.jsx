import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExistingStatsView from './ExistingStatsView';
import NoStatsView from './NoStatsView';
import { resetWorkoutAndMealScheduleStates } from '../../../reducers/WorkoutAndMealSchedule';
import theme from '../../../theme';

export default function StatsView() {
  const dispatch = useDispatch();
  const {
    workoutSchedule, mealSchedule, isError, isSuccess, message,
  } = useSelector((state) => state.workoutAndMealSchedule);
  const schedulesExist = workoutSchedule && mealSchedule
    && workoutSchedule.schedule && mealSchedule.schedule;

  useEffect(() => {
    if (isError) {
      dispatch(resetWorkoutAndMealScheduleStates());
    }

    if (isSuccess) {
      dispatch(resetWorkoutAndMealScheduleStates());
    }
  }, [workoutSchedule, mealSchedule, isError, isSuccess, message, dispatch]);

  return (
    <Grid
      container
      sx={{
        p: 3,
        borderRadius: '10px',
        border: `1px solid ${theme.palette.secondary.main}`,
        bgcolor: theme.palette.secondary.dark,
      }}
    >
      {schedulesExist ? (
        <ExistingStatsView />
      ) : (
        <NoStatsView />
      ) }
    </Grid>
  );
}
