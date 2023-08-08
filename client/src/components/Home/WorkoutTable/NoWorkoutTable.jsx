import {
  Grid, Typography,
} from '@mui/material';
import React from 'react';

import theme from '../../../theme';

export default function NoWorkoutTable() {
  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ p: 2, height: '15vw' }}>
      <Typography variant="h5" component="span" color={theme.palette.secondary.main}>
        Workout data not available. Please generate a plan first.
      </Typography>
    </Grid>
  );
}
