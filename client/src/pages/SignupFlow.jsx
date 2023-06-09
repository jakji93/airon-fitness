import {
  Stepper, Step, StepLabel, Box,
} from '@mui/material';
import React, { useState } from 'react';

import SignupDetails from '../components/Signup/SignupDetails';
import SignupLanding from '../components/Signup/SignupLanding';
import SignupStats from '../components/Signup/SignupStats';

export default function SignupFlow() {
  const [user, setUser] = useState({});
  const [step, setStep] = useState(0);
  const steps = ['Account Creation', 'Personal', 'Health'];

  const handleNext = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const updateUser = (data) => {
    setUser({ ...user, ...data });
  };

  const getCurrentStage = () => {
    let stage;
    switch (step) {
      case 0:
        stage = <SignupLanding nextStage={handleNext} updateUser={updateUser} />;
        break;
      case 1:
        stage = <SignupDetails nextStage={handleNext} updateUser={updateUser} />;
        break;
      case 2:
        stage = <SignupStats nextStage={handleNext} updateUser={updateUser} />;
        break;
      default:
        break;
    }

    return stage;
  };

  return (
    <Box>
      <Stepper activeStep={step} sx={{ margin: '3%' }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      { getCurrentStage() }
    </Box>
  );
}
