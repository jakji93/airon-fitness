import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExistingWorkoutTable from './ExistingWorkoutTable';
import NoWorkoutTable from './NoWorkoutTable';
import { resetWorkoutAndMealScheduleStates } from '../../../reducers/WorkoutAndMealSchedule';
import theme from '../../../theme';

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
      <Grid
        container
        sx={{
          p: 3,
          borderRadius: '10px',
          border: `1px solid ${theme.palette.secondary.main}`,
          bgcolor: theme.palette.secondary.dark,
        }}
      >
        {workoutSchedule ? (
          <ExistingWorkoutTable />
        ) : (
          <NoWorkoutTable />
        )}
      </Grid>
    </div>
  );
}
