import { Grid, Typography } from '@mui/material';
import React from 'react';

import ChatArea from '../components/Home/ChatArea';
import FitnessPlanView from '../components/Home/PlanView/FitnessPlanView';
import StatsView from '../components/Home/StatsView/StatsView';

export default function Home() {
  return (
    <>
      <Typography variant="h1">
        Home Page
      </Typography>
      <Grid container sx={{ p: 2 }} spacing={4}>
        <Grid item xs>
          <FitnessPlanView />
        </Grid>
        <Grid item xs>
          <StatsView />
        </Grid>
        <Grid item xs={4.5}>
          <ChatArea />
        </Grid>
      </Grid>
    </>
  );
}
