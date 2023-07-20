import {
  Grid, Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  healthConditionsAndInjuriesOptions, dietaryRestrictionsOptions,
  allergiesIntolerancesOptions, weeklyAvailabilityOptions,
} from '../../constants/AdditionalProfile';
import { setSignup } from '../../reducers/Signup';
import { registerUserProfile } from '../../reducers/UserProfile';
import { restrictPercentageValue } from '../Profile/AdditionalProfileForm';
import Form from '../Profile/Forms/Form';
import FormMultiInput from '../Profile/Forms/FormMultiInput';
import FormMultiSelect from '../Profile/Forms/FormMultiSelect';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldInput from '../Profile/Forms/FormTextFieldInput';

export default function SignupAdditionalDetails() {
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const [
    healthConditions,
    setHealthConditions,
  ] = useState(signup.user.healthConditions);
  const [
    dietRestriction,
    setDietRestriction,
  ] = useState(signup.user.dietRestriction ?? []);
  const [
    allergies,
    setAllergies,
  ] = useState(signup.user.allergies ?? []);
  const [
    weeklyAvailability,
    setWeeklyAvailability,
  ] = useState(signup.user.weeklyAvailability ?? null);
  const [bodyFat, setBodyFat] = useState(signup.user.bodyFat ?? null);
  const [
    muscleMass,
    setMuscleMass,
  ] = useState(signup.user.muscleMass ?? null);
  const [duration, setDuration] = useState(signup.user.duration ?? null);
  const [preference, setPreference] = useState(signup.user.preference ?? ['e.g. Squat']);
  const [equipment, setEquipment] = useState(signup.user.equipment ?? ['e.g. Dumbbells']);

  const handleSubmit = () => {
    dispatch(setSignup({
      user: {
        healthConditions,
        dietRestriction,
        allergies,
        weeklyAvailability,
        bodyFat,
        muscleMass,
        duration,
        preference,
        equipment,
      },
      step: signup.step,
    }));
    dispatch(registerUserProfile({
      ...signup.user,
      healthConditions,
      dietRestriction,
      allergies,
      weeklyAvailability,
      bodyFat,
      muscleMass,
      duration,
      preference,
      equipment,
    }));
  };

  const handleBack = () => {
    dispatch(setSignup({
      user: {
        healthConditions,
        dietRestriction,
        allergies,
        weeklyAvailability,
        bodyFat,
        muscleMass,
        duration,
        preference,
        equipment,
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
        value={bodyFat}
        setValue={(val) => restrictPercentageValue(val, setBodyFat)}
        endAdornment="%"
        customTextFieldGridSize={6}
        showTitleLabel={false}
        type="number"
      />
      <FormTextFieldInput
        id="muscle-mass-percentage"
        label="Muscle Mass Percentage"
        value={muscleMass}
        setValue={(val) => restrictPercentageValue(val, setMuscleMass)}
        endAdornment="%"
        customTextFieldGridSize={6}
        showTitleLabel={false}
        type="number"
      />
      <FormTextFieldInput
        id="workout-duration"
        label="Workout Duration"
        value={duration}
        setValue={setDuration}
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
        value={preference}
        setValue={setPreference}
        showTitleLabel={false}
        customTextFieldGridSize={12}
      />
      <FormMultiInput
        id="equipment-availability"
        label="Equipment Availability"
        value={equipment}
        setValue={setEquipment}
        showTitleLabel={false}
        customTextFieldGridSize={12}
      />
      <FormMultiSelect
        id="health-conditions-and-injuries"
        label="Health Conditions & Injuries"
        value={healthConditions}
        setValue={setHealthConditions}
        options={healthConditionsAndInjuriesOptions}
        showTitleLabel={false}
        customTextFieldGridSize={12}
        limitTags={3}
      />
      <FormMultiSelect
        id="allergies-intolerances"
        label="Allergies & Intolerances"
        value={allergies}
        setValue={setAllergies}
        options={allergiesIntolerancesOptions}
        showTitleLabel={false}
        customTextFieldGridSize={12}
        limitTags={3}
      />
      <FormMultiSelect
        id="dietary-restrictions"
        label="Dietary Restrictions"
        value={dietRestriction}
        setValue={setDietRestriction}
        options={dietaryRestrictionsOptions}
        showTitleLabel={false}
        customTextFieldGridSize={12}
        limitTags={3}
      />
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
