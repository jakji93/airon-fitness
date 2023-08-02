import {
  Card, Grid, Typography,
} from '@mui/material';
import React from 'react';

export default function WorkoutTable() {
  return (
    <div>
      <Grid container component={Card} sx={{ p: 1 }}>
        <Typography variant="h2">
          Workout Table
        </Typography>
      </Grid>
    </div>
  );
}
