import {
  Button, Grid, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ConfirmationModal from './ConfirmationModal';
import { createWorkoutAndMealSchedule } from '../../../reducers/WorkoutAndMealSchedule';

export default function NoSchedule() {
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(false);

  const createSchedules = () => dispatch(createWorkoutAndMealSchedule());

  return (
    <Grid container alignItems="center" sx={{ p: 2, borderRadius: '10px' }}>
      <Grid item xs={12}>
        <Typography variant="h5" component="span" color="text.secondary">
          Get started by creating a plan!
        </Typography>
      </Grid>
      <Grid item xs>
        <Button variant="outlined" onClick={() => setConfirmationModal(true)}>Create My Plans</Button>
        <ConfirmationModal
          open={confirmationModal}
          setOpen={setConfirmationModal}
          onYes={createSchedules}
          dialogTitle="Create your workout and meal plans?"
          dialogContent="Are you ready to create your workout and meal plan powered by AI?
          This will use all the basic and additional customizable profile information you provided.
          You may update or confirm your profile information in your Profile page before continuing.
          This may take a couple minutes."
        />
      </Grid>
    </Grid>
  );
}
