import {
  Box, Typography, Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import GuidedWorkout from '../components/Workout/GuidedWorkout';
import WorkoutCarousel from '../components/Workout/WorkoutCarousel';
import StepEnum from '../components/Workout/WorkoutFlowStates';
import WorkoutSelector from '../components/Workout/WorkoutSelector';
import theme from '../theme';

const styles = {
  container: {
    backgroundColor: theme.palette.secondary.dark,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column', // Arrange children vertically
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
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
    fontSize: '0.75vw',
    width: '15vw',
    position: 'relative', // Set the position to relative for the pseudo-element
    overflow: 'hidden', // Hide any overflow from the pseudo-element
    '&:hover': {
      color: theme.palette.secondary.light,
      borderColor: '#F3F3F0',
      backgroundColor: theme.palette.secondary.main,
      transition: 'background-color 0.5s ease',
    },
  },
};

export default function Workout() {
  const getDayOfWeekName = () => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeekNames[dayOfWeek];
  };

  const { workoutSchedule } = useSelector((state) => state.workoutAndMealSchedule);
  const [step, setStep] = useState(StepEnum.START_WORKOUT);
  const [day, setDay] = useState(getDayOfWeekName());

  // States: START_WORKOUT, SELECT_WORKOUT, IN_SESSION
  const handleNext = (nextStep) => {
    setStep(nextStep);
  };

  const handleDay = (newDay) => {
    setDay(newDay);
  };

  return (
    <Box sx={{ font: theme.typography.fontFamily }}>
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
