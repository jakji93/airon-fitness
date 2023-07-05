import {
  Stepper, Step, StepLabel, Box,
} from '@mui/material';
import React, { useState } from 'react';

import SignupDetails from '../components/Signup/SignupDetails';
import SignupRegisterAccount from '../components/Signup/SignupRegisterAccount';
import SignupStats from '../components/Signup/SignupStats';
import { HEIGHT_UNITS, WEIGHT_UNITS } from '../constants/BasicProfile';

export default function SignupFlow() {
  const [gender, setGender] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [weightUnits, setWeightUnits] = useState(WEIGHT_UNITS.KG);
  const [heightUnits, setHeightUnits] = useState(HEIGHT_UNITS.IN);
  const [experience, setExperience] = useState('');
  const [healthConditionsAndInjuries, setHealthConditionsAndInjuries] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [allergiesIntolerances, setAllergiesIntolerances] = useState([]);
  const [weeklyAvailability, setWeeklyAvailability] = useState('1');

  const [step, setStep] = useState(0);
  const steps = ['Account Creation', 'Personal', 'Health'];

  const handleNext = (e) => {
    if (e) e.preventDefault();
    setStep((prevStep) => prevStep + 1);

    if (step === 3) {
      // console.log(user);
      // TODO: Implement API call to create user
    }
  };

  const handlePrev = (e) => {
    if (e) e.preventDefault();
    setStep((prevStep) => prevStep - 1);
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
      {step === 0 && (
        <SignupRegisterAccount
          nextStage={handleNext}
        />
      )}
      {step === 1 && (
        <SignupDetails
          nextStage={handleNext}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          gender={gender}
          setGender={setGender}
        />
      )}
      {step === 2 && (
        <SignupStats
          nextStage={handleNext}
          prevStage={handlePrev}
          weight={weight}
          height={height}
          experience={experience}
          healthConditionsAndInjuries={healthConditionsAndInjuries}
          dietaryRestrictions={dietaryRestrictions}
          allergiesIntolerances={allergiesIntolerances}
          weeklyAvailability={weeklyAvailability}
          weightUnits={weightUnits}
          heightUnits={heightUnits}
          setWeight={setWeight}
          setHeight={setHeight}
          setExperience={setExperience}
          setHealthConditionsAndInjuries={setHealthConditionsAndInjuries}
          setDietaryRestrictions={setDietaryRestrictions}
          setAllergiesIntolerances={setAllergiesIntolerances}
          setWeeklyAvailability={setWeeklyAvailability}
          setWeightUnits={setWeightUnits}
          setHeightUnits={setHeightUnits}
        />
      )}
    </Box>
  );
}
