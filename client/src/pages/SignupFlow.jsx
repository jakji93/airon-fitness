import React, { useState } from 'react';
import { Box } from '@mui/material';

import SignupLanding from '../components/Signup/SignupLanding';
import SignupDetails from '../components/Signup/SignupDetails';
import SignupStats from '../components/Signup/SignupStats';

export default function SignupFlow() {
  const [user, setUser] = useState({});
  const [step, setStep] = useState(0);

  const nextStage = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const updateUser = (data) => {
    setUser({ ...user, ...data });
  };

  const getCurrentStage = () => {
    let stage;
    switch (step) {
      case 0:
        stage = <SignupLanding nextStage={nextStage} updateUser={updateUser} />;
        break;
      case 1:
        stage = <SignupDetails nextStage={nextStage} updateUser={updateUser} />;
        break;
      case 2:
        stage = <SignupStats nextStage={nextStage} updateUser={updateUser} />;
        break;
      default:
        break;
    }

    return stage;
  };

  return (
    <Box>
      { getCurrentStage() }
    </Box>
  );
}
