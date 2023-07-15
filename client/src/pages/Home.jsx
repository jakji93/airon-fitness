import { Grid, Typography } from '@mui/material';
import React from 'react';

import ChatArea from '../components/Home/ChatArea';
import TabbedScheduleView from '../components/Home/PlanView/TabbedScheduleView';
import StatsView from '../components/Home/StatsView/StatsView';

export default function Home() {
  return (
    <>
      <Typography variant="h2">
        Welcome to Ai-ron Fitness!
      </Typography>
      <Typography variant="subtitle1">
        Where AI Whips You into Shape and Leaves You Bot-ter than Ever!
      </Typography>
      <Grid container sx={{ p: 2 }} spacing={4}>
        <Grid item xs>
          <TabbedScheduleView />
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
