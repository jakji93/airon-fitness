import {
  Box,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import GuidedWorkout from '../components/Workout/GuidedWorkout';
import WorkoutCarousel from '../components/Workout/WorkoutCarousel';
import StepEnum from '../components/Workout/WorkoutFlowStates';
import WorkoutSelector from '../components/Workout/WorkoutSelector';
import theme from '../theme';

const styles = {
  font: theme.typography.fontFamily,
  container: {
    backgroundColor: theme.palette.secondary.dark,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column', // Arrange children vertically
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
    minHeight: '95vh',
  },
};

export default function Workout() {
  const { workoutSchedule } = useSelector((state) => state.workoutAndMealSchedule);
  const [step, setStep] = useState(StepEnum.START_WORKOUT);

  // States: START_WORKOUT, SELECT_WORKOUT, IN_SESSION
  const handleNext = (nextStep) => {
    setStep(nextStep);
  };

  return (
    <Box sx={styles.font}>
      {workoutSchedule ? (
        <Box sx={styles.container}>
          {step === StepEnum.START_WORKOUT
          && (
          <WorkoutSelector workoutData={workoutSchedule} onNext={handleNext} />
          )}

          {step === StepEnum.SELECT_WORKOUT
          && (
          <WorkoutCarousel workoutData={workoutSchedule} onNext={handleNext} />
          )}

          {step === StepEnum.IN_SESSION
          && (
          <GuidedWorkout workoutData={workoutSchedule} onNext={handleNext} />
          )}
        </Box>
      ) : (
        <Box sx={styles.container}>
          <p> please generate schedules </p>
        </Box>
      )}
    </Box>

  );
}
