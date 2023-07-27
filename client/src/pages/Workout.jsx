import {
  Box,
  Button,
} from '@mui/material';
import React, { useState } from 'react';

import WorkoutSelector from '../components/Workout/WorkoutSelector';

export default function Workout() {
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <Box>
      {step === 1 && <WorkoutSelector onNext={handleNext} />}
      {step === 2 && (
        <div>
          <h2>Dummy Text for Step 2</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac metus nec arcu
            tincidunt varius. Mauris egestas, nisl a scelerisque fermentum, turpis neque mollis
            mauris, vel bibendum tellus nisi at ligula. Sed auctor urna purus, vel lacinia quam
            hendrerit et.
          </p>
          <Button onClick={handlePrevious}>Previous</Button>
          <Button onClick={handleNext}>Next</Button>
        </div>
      )}
    </Box>
  );
}
