import {
  Card, Grid, Typography,
} from '@mui/material';
import React from 'react';

export default function NoStatsView() {
  return (
    <Grid container component={Card} alignItems="center" justifyContent="center" sx={{ p: 3, borderRadius: '10px' }}>
      <Typography variant="h5" component="span" color="text.secondary">
        Create a plan to view the statistics!
      </Typography>
    </Grid>
  );
}
