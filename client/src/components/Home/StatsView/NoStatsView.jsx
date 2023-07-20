import {
  Card, Grid, Typography,
} from '@mui/material';
import React from 'react';

export default function NoStatsView() {
  return (
    <Grid container component={Card} alignItems="center" sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h5" component="span" color="text.secondary">
          Create a plan to view the statistics!
        </Typography>
      </Grid>
    </Grid>
  );
}
