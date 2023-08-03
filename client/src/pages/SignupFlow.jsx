import {
  CssBaseline, Stepper, Step, StepLabel, Box,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ToastContext } from '../components/common/context/ToastContextProvider';
import Spinner from '../components/common/Spinner';
import SignupAdditionalDetails from '../components/Signup/SignupAdditionalDetails';
import SignupAPIKey from '../components/Signup/SignupAPIKey';
import SignupBasicUserDetails from '../components/Signup/SignupBasicUserDetails';
import SignupRegisterAccount from '../components/Signup/SignupRegisterAccount';
import SignupRequireUserDetails from '../components/Signup/SignupRequireUserDetails';
import { removeSignup } from '../reducers/Signup';
import { resetUserProfileStates } from '../reducers/UserProfile';

export default function SignupFlow() {
  const openToast = useContext(ToastContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    profile, isLoading, isError, isSuccess, message,
  } = useSelector((state) => state.userProfile);
  const { step } = useSelector((state) => state.signup);

  const stepTitles = ['Account Creation', 'Personal Info', 'Required Info', 'API Key', 'Customize Profile'];

  useEffect(() => {
    if (isError) {
      openToast('error', message);
    }

    if (isSuccess || profile) {
      openToast('success', 'You\'re all set up!');
      navigate('/app');
      dispatch(removeSignup());
    }

    dispatch(resetUserProfileStates);
  }, [profile, isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box>
      <CssBaseline />
      <Stepper activeStep={step} sx={{ margin: '3%' }} alternativeLabel>
        {stepTitles.map((label) => (
          <Step
            key={label}
            sx={{
              '& .MuiStepLabel-root .Mui-completed': {
                color: 'secondary.main', // circle color (COMPLETED)
              },
              '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel':
                {
                  color: 'secondary.main', // Just text label (COMPLETED)
                },
              '& .MuiStepLabel-root .Mui-active': {
                color: 'secondary.main', // circle color (ACTIVE)
              },
              '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
                {
                  color: 'secondary.light', // Just text label (ACTIVE)
                },
              '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                fill: 'secondary.light', // circle's number (ACTIVE)
              },
            }}
          >
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
