import { Grid } from '@mui/material';
import React from 'react';

import ChatArea from '../components/Home/ChatArea/ChatArea';
import TabbedScheduleView from '../components/Home/PlanView/TabbedScheduleView';
import StatsView from '../components/Home/StatsView/StatsView';
import WorkoutTable from '../components/Home/WorkoutTable';

export default function Home() {
  return (
    <Grid container sx={{ p: 3 }} spacing={5}>
      <Grid item xs={12} sm={6}>
        <TabbedScheduleView />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StatsView />
      </Grid>
      <Grid item xs={12} sm={6}>
        <WorkoutTable />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ChatArea />
      </Grid>
    </Grid>
  );
}
