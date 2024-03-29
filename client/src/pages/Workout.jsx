import {
  Box, Typography, Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RelativeSpinner from '../components/common/RelativeSpinner';
import GuidedWorkout from '../components/Workout/GuidedWorkout';
import WorkoutCarousel from '../components/Workout/WorkoutCarousel';
import StepEnum from '../components/Workout/WorkoutFlowStates';
import WorkoutSelector from '../components/Workout/WorkoutSelector';
import { getWorkoutAndMealSchedule } from '../reducers/WorkoutAndMealSchedule';
import theme from '../theme';

const styles = {
  container: {
    backgroundColor: theme.palette.secondary.dark,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '95vh',
  },
  workoutButton: {
    fontWeight: 'normal',
    color: theme.palette.secondary.light,
    borderColor: '#B5936B',
    backgroundColor: theme.palette.secondary.dark,
    marginTop: '25px',
    marginBottom: '25px',
    padding: '15px',
    fontSize: 'clamp(7.5px, 0.75vw, 50px)',
    width: 'clamp(50px, 15vw, 1000px)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      color: theme.palette.secondary.dark,
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.main,
      transition: 'background-color 0.5s ease',
    },
  },
};

const getDayOfWeekName = () => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeekNames[dayOfWeek];
};

export default function Workout() {
  const { workoutSchedule, mealSchedule } = useSelector((state) => state.workoutAndMealSchedule);
  const [step, setStep] = useState(StepEnum.START_WORKOUT);
  const [day, setDay] = useState(getDayOfWeekName());
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getSchedules = async () => {
    try {
      setLoading(true);
      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve('Generation in progress');
        }, 2000);
      });
      const schedulePromise = dispatch(getWorkoutAndMealSchedule());

      await Promise.race([schedulePromise, timeoutPromise]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!workoutSchedule || !mealSchedule) {
      getSchedules();
    }
  }, []);

  const handleNext = (nextStep) => {
    setStep(nextStep);
  };

  const handleDay = (newDay) => {
    setDay(newDay);
  };

  return (
    <Box sx={{ font: theme.typography.fontFamily }}>
      {loading && <RelativeSpinner />}
      {workoutSchedule ? (
        <Box sx={styles.container}>
          {step === StepEnum.START_WORKOUT
          && (
          <WorkoutSelector
            currentDay={getDayOfWeekName()}
            workoutData={workoutSchedule}
            onNext={handleNext}
          />
          )}

          {step === StepEnum.SELECT_WORKOUT
          && (
          <WorkoutCarousel
            handleDay={handleDay}
            workoutData={workoutSchedule}
            onNext={handleNext}
          />
          )}

          {step === StepEnum.IN_SESSION
          && (
          <GuidedWorkout
            sessionDay={day}
            workoutData={workoutSchedule}
            onNext={handleNext}
          />
          )}
        </Box>
      ) : (
        <Box sx={styles.container}>
          <Typography sx={{ fontSize: '3vw', color: theme.palette.secondary.main }}>
            Please generate your workouts on the home page first.
          </Typography>
          <Button
            href="/app"
            variant="outlined"
            sx={styles.workoutButton}
          >
            BACK TO HOME
          </Button>
        </Box>
      )}
    </Box>

  );
}
