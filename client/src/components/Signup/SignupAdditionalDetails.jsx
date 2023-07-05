import {
  Grid, Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  healthConditionsAndInjuriesOptions, dietaryRestrictionsOptions,
  allergiesIntolerancesOptions, weeklyAvailabilityOptions,
} from '../../constants/AdditionalProfile';
import { removeSignup, setSignup } from '../../reducers/Signup';
import { restrictPercentageValue } from '../Profile/AdditionalProfileForm';
import Form from '../Profile/Forms/Form';
import FormMultiInput from '../Profile/Forms/FormMultiInput';
import FormMultiSelect from '../Profile/Forms/FormMultiSelect';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldInput from '../Profile/Forms/FormTextFieldInput';

export default function SignupAdditionalDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const [
    healthConditionsAndInjuries,
    setHealthConditionsAndInjuries,
  ] = useState(signup.user.healthConditionsAndInjuries);
  const [
    dietaryRestrictions,
    setDietaryRestrictions,
  ] = useState(signup.user.dietaryRestrictions ?? []);
  const [
    allergiesIntolerances,
    setAllergiesIntolerances,
  ] = useState(signup.user.allergiesIntolerances ?? []);
  const [
    weeklyAvailability,
    setWeeklyAvailability,
  ] = useState(signup.user.weeklyAvailability ?? null);
  const [bodyFatPercentage, setBodyFatPercentage] = useState(signup.user.bodyFatPercentage ?? null);
  const [
    muscleMassPercentage,
    setMuscleMassPercentage,
  ] = useState(signup.user.muscleMassPercentage ?? null);
  const [workoutDuration, setWorkoutDuration] = useState(signup.user.workoutDuration ?? null);
  const [exercisePreferences, setExercisePreferences] = useState(signup.user.exercisePreferences ?? ['e.g. Squat']);
  const [equipmentAvailability, setEquipmentAvailability] = useState(signup.user.equipmentAvailability ?? ['e.g. Dumbbells']);

  const handleSubmit = () => {
    dispatch(setSignup({
      user: {
        healthConditionsAndInjuries,
        dietaryRestrictions,
        allergiesIntolerances,
        weeklyAvailability,
        bodyFatPercentage,
        muscleMassPercentage,
        workoutDuration,
        exercisePreferences,
        equipmentAvailability,
      },
      step: signup.step,
    }));
    // TODO: call backend to make profile
    dispatch(removeSignup());
    navigate('/app');
  };

  const handleBack = () => {
    dispatch(setSignup({
      user: {
        healthConditionsAndInjuries,
        dietaryRestrictions,
        allergiesIntolerances,
        weeklyAvailability,
        bodyFatPercentage,
        muscleMassPercentage,
        workoutDuration,
        exercisePreferences,
        equipmentAvailability,
      },
      step: signup.step - 1,
    }));
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="Optionally, provide some additional information to further customize your plan"
      containerSx={{ width: '80vw', maxWidth: '675px' }}
      centerTitle
    >
      <FormTextFieldInput
        id="body-fat-percentage"
        label="Body Fat Percentage"
        value={bodyFatPercentage}
        setValue={(val) => restrictPercentageValue(val, setBodyFatPercentage)}
        endAdornment="%"
        customTextFieldGridSize={6}
        showTitleLabel={false}
        type="number"
      />
      <FormTextFieldInput
        id="muscle-mass-percentage"
        label="Muscle Mass Percentage"
        value={muscleMassPercentage}
        setValue={(val) => restrictPercentageValue(val, setMuscleMassPercentage)}
        endAdornment="%"
        customTextFieldGridSize={6}
        showTitleLabel={false}
        type="number"
      />
      <FormTextFieldInput
        id="workout-duration"
        label="Workout Duration"
        value={workoutDuration}
        setValue={setWorkoutDuration}
        endAdornment="minutes"
        customTextFieldGridSize={6}
        showTitleLabel={false}
        type="number"
      />
      <FormSelect
        id="weekly-availability"
        label="Weekly Availability"
        value={weeklyAvailability}
        setValue={setWeeklyAvailability}
        options={weeklyAvailabilityOptions}
        showTitleLabel={false}
        endAdornment="days"
        customTextFieldGridSize={6}
      />
      <FormMultiInput
        id="exercise-preferences"
        label="Exercise Preferences"
        value={exercisePreferences}
        setValue={setExercisePreferences}
        showTitleLabel={false}
        customTextFieldGridSize={12}
      />
      <FormMultiInput
        id="equipment-availability"
        label="Equipment Availability"
        value={equipmentAvailability}
        setValue={setEquipmentAvailability}
        showTitleLabel={false}
        customTextFieldGridSize={12}
      />
      <FormMultiSelect
        id="health-conditions-and-injuries"
        label="Health Conditions & Injuries"
        value={healthConditionsAndInjuries}
        setValue={setHealthConditionsAndInjuries}
        options={healthConditionsAndInjuriesOptions}
        showTitleLabel={false}
        customTextFieldGridSize={6}
      />
      <FormMultiSelect
        id="allergies-intolerances"
        label="Allergies & Intolerances"
        value={allergiesIntolerances}
        setValue={setAllergiesIntolerances}
        options={allergiesIntolerancesOptions}
        showTitleLabel={false}
        customTextFieldGridSize={6}
      />
      <FormMultiSelect
        id="dietary-restrictions"
        label="Dietary Restrictions"
        value={dietaryRestrictions}
        setValue={setDietaryRestrictions}
        options={dietaryRestrictionsOptions}
        showTitleLabel={false}
        customTextFieldGridSize={6}
      />
      <Grid item xs={12} sm={6} />
      <Grid
        item
        xs={12}
        sm={6}
      >
        <Button
          onClick={handleBack}
          variant="contained"
          fullWidth
        >
          Back
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
      >
        <Button
          type="submit"
          variant="contained"
          fullWidth
        >
          Create
        </Button>
      </Grid>
    </Form>
  );
}
