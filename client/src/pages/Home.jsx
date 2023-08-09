import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useStore } from 'react-redux';

import RelativeSpinner from '../components/common/RelativeSpinner';
import ChatArea from '../components/Home/ChatArea/ChatArea';
import TabbedScheduleView from '../components/Home/PlanView/TabbedScheduleView';
import StatsView from '../components/Home/StatsView/StatsView';
import WorkoutTable from '../components/Home/WorkoutTable/WorkoutTable';
import { getWorkoutAndMealSchedule } from '../reducers/WorkoutAndMealSchedule';

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const store = useStore();

  const getSchedules = async () => {
    try {
      setLoading(true);

      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve('Generation in progress');
        }, 1500);
      });
      const schedulePromise = dispatch(getWorkoutAndMealSchedule());

      await Promise.race([schedulePromise, timeoutPromise]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!store.workoutAndMealSchedule?.workoutSchedule
      || !store.workoutAndMealSchedule?.mealSchedule) {
      getSchedules();
    }

    if ('Notification' in window) Notification.requestPermission();
  }, []);

  const animateTile = (delay) => ({
    opacity: 0,
    animation: `slideFadeIn 0.75s ease-in-out ${delay}s forwards`,

    '@keyframes slideFadeIn': {
      '0%': {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  });

  return (
    loading
      ? <RelativeSpinner />
      : (
        <Grid container sx={{ p: 3 }} spacing={5} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            sx={animateTile(0)}
          >
            <TabbedScheduleView />
          </Grid>
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            sx={animateTile(0.15)}
          >
            <StatsView />
          </Grid>
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            sx={animateTile(0.30)}
          >
            <WorkoutTable />
          </Grid>
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            sx={animateTile(0.45)}
          >
            <ChatArea />
          </Grid>
        </Grid>
      )
  );
}
