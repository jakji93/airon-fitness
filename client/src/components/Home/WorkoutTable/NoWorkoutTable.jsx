import {
  Grid, Typography,
} from '@mui/material';
import React from 'react';

export default function NoWorkoutTable() {
  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ p: 2 }}>
      <Typography variant="h5" component="span" color="text.secondary">
        Workout plan data not available.
      </Typography>
    </Grid>
  );
}
