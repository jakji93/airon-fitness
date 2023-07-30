import { Grid } from '@mui/material';
import React from 'react';

import ChatArea from '../components/Home/ChatArea';
import TabbedScheduleView from '../components/Home/PlanView/TabbedScheduleView';
import StatsView from '../components/Home/StatsView/StatsView';

export default function Home() {
  return (
    <Grid container sx={{ p: 2 }} spacing={4}>
      <Grid item xs>
        <TabbedScheduleView />
      </Grid>
      <Grid item xs>
        <StatsView />
      </Grid>
      <Grid item xs>
        <ChatArea />
      </Grid>
    </Grid>
  );
}
