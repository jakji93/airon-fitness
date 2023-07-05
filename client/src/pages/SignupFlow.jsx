import {
  Stepper, Step, StepLabel, Box,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import SignupAdditionalDetails from '../components/Signup/SignupAdditionalDetails';
import SignupAPIKey from '../components/Signup/SignupAPIKey';
import SignupBasicUserDetails from '../components/Signup/SignupBasicUserDetails';
import SignupRegisterAccount from '../components/Signup/SignupRegisterAccount';
import SignupRequireUserDetails from '../components/Signup/SignupRequireUserDetails';

export default function SignupFlow() {
  const step = useSelector((state) => state.signup.step);

  const stepTitles = ['Account Creation', 'Personal Info', 'Required Info', 'API Key', 'Customize Profile'];

  return (
    <Box>
      <Stepper activeStep={step} sx={{ margin: '3%' }}>
        {stepTitles.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {step === 0 && <SignupRegisterAccount />}
      {step === 1 && <SignupBasicUserDetails />}
      {step === 2 && <SignupRequireUserDetails />}
      {step === 3 && <SignupAPIKey />}
      {step === 4 && <SignupAdditionalDetails />}
    </Box>
  );
}
