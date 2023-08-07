import {
  Button, Grid, Box,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Typewriter from 'typewriter-effect';

import ConfirmationModal from './ConfirmationModal';
import { createWorkoutAndMealSchedule } from '../../../reducers/WorkoutAndMealSchedule';
import theme from '../../../theme';

export default function NoSchedule() {
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(false);

  const createSchedules = () => dispatch(createWorkoutAndMealSchedule());

  return (
    <Grid container alignItems="center" sx={{ p: 2, borderRadius: '10px' }}>
      <Grid item xs={12}>
        <Box sx={{ fontSize: '1.5vw', paddingBottom: '2vh' }}>
          <Typewriter
            onInit={(typewriter) => {
              typewriter.changeDelay(40)
                .typeString('Get started by creating a plan.')
                .start();
            }}
          />
        </Box>
      </Grid>
      <Grid item xs>
        <Button
          sx={{
            fontSize: '1.5vw',
            '&:hover': {
              backgroundColor: theme.palette.secondary.main,
            },
          }}
          variant="contained"
          onClick={() => setConfirmationModal(true)}
        >
          Generate My Personal Schedules
        </Button>
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
