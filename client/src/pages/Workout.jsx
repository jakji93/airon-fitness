import {
  Box,
  Button,
} from '@mui/material';
import React, { useState } from 'react';

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
};

export default function Workout() {
  const [step, setStep] = useState(StepEnum.START_WORKOUT);

  // States: START_WORKOUT, SELECT_WORKOUT, IN_SESSION
  const handleNext = (nextStep) => {
    setStep(nextStep);
  };

  return (
    <Box sx={styles.container}>
      {step === StepEnum.START_WORKOUT
      && (
      <WorkoutSelector onNext={() => handleNext(StepEnum.DUMMY_TEXT)} />
      )}

      {step === StepEnum.DUMMY_TEXT && (
      <div>
        <h2>Dummy Text for Step 2</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac metus nec arcu
          tincidunt varius. Mauris egestas, nisl a scelerisque fermentum, turpis neque mollis
          mauris, vel bibendum tellus nisi at ligula. Sed auctor urna purus, vel lacinia quam
          hendrerit et.
        </p>
        <Button onClick={() => handleNext(StepEnum.START_WORKOUT)}>Next</Button>
      </div>
      )}
    </Box>
  );
}
