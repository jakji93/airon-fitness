import { Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormMultiInput from './Forms/FormMultiInput';
import FormMultiSelect from './Forms/FormMultiSelect';
import FormSelect from './Forms/FormSelect';
import FormTextFieldInput from './Forms/FormTextFieldInput';
import PaperForm from './Forms/PaperForm';
import {
  healthConditionsAndInjuriesOptions,
  dietaryRestrictionsOptions,
  allergiesIntolerancesOptions,
  weeklyAvailabilityOptions,
} from '../../constants/AdditionalProfile';
import { updateUserProfile } from '../../reducers/UserProfile';

export const restrictPercentageValue = (input, set) => {
  const zeroToHundredRegex = /^(?:100|[1-9]\d|\d)$/;
  if (input === '' || zeroToHundredRegex.test(input)) {
    set(input);
  }
};

export default function AdditionalProfileForm(props) {
  const {
    setUpdatingProfile,
  } = props;
  const profile = useSelector((state) => state.userProfile.profile);

  const [healthConditions, setHealthConditions] = useState(profile?.healthConditions ?? []);
  const [dietRestriction, setDietRestriction] = useState(profile?.dietRestriction ?? []);
  const [allergies, setAllergies] = useState(profile?.allergies ?? []);
  const [weeklyAvailability, setWeeklyAvailability] = useState(profile?.weeklyAvailability ?? '1');
  const [bodyFat, setBodyFat] = useState(profile?.bodyFat ?? 0);
  const [muscleMass, setMuscleMass] = useState(profile?.muscleMass ?? 0);
  const [duration, setDuration] = useState(profile?.duration ?? 0);
  const [preference, setPreference] = useState(profile?.preference ?? []);
  const [equipment, setEquipment] = useState(profile?.equipment ?? []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setHealthConditions(profile.healthConditions);
      setDietRestriction(profile.dietRestriction);
      setAllergies(profile.allergies);
      setWeeklyAvailability(profile.weeklyAvailability);
      setBodyFat(profile.bodyFat);
      setMuscleMass(profile.muscleMass);
      setDuration(profile.duration);
      setPreference(profile.preference);
      setEquipment(profile.equipment);
    }
  }, [profile, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUpdatingProfile(true);
    dispatch(updateUserProfile({
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

  return (
    <PaperForm
      handleSubmit={handleSubmit}
      formTitle="Update Additional Profile"
    >
      <FormTextFieldInput
        id="body-fat-percentage"
        label="Body Fat Percentage"
        half
        value={bodyFat}
        setValue={(val) => restrictPercentageValue(val, setBodyFat)}
        endAdornment="%"
      />
      <FormTextFieldInput
        id="muscle-mass-percentage"
        label="Muscle Mass Percentage"
        half
        value={muscleMass}
        setValue={(val) => restrictPercentageValue(val, setMuscleMass)}
        endAdornment="%"
      />
      <FormMultiSelect
        id="health-conditions-and-injuries"
        label="Health Conditions & Injuries"
        value={healthConditions}
        setValue={setHealthConditions}
        options={healthConditionsAndInjuriesOptions}
        showTitleLabel
      />
      <FormMultiSelect
        id="dietary-restrictions"
        label="Dietary Restrictions"
        value={dietRestriction}
        setValue={setDietRestriction}
        options={dietaryRestrictionsOptions}
        showTitleLabel
      />
      <FormMultiSelect
        id="allergies-intolerances"
        label="Allergies & Intolerances"
        value={allergies}
        setValue={setAllergies}
        options={allergiesIntolerancesOptions}
        showTitleLabel
      />
      <FormSelect
        id="weekly-availability"
        label="Weekly Availability"
        value={weeklyAvailability}
        setValue={setWeeklyAvailability}
        options={weeklyAvailabilityOptions}
        half
        endAdornment="days"
        showTitleLabel
      />
      <FormTextFieldInput
        id="workout-duration"
        label="Workout Duration"
        half
        value={duration}
        setValue={setDuration}
        endAdornment="minutes"
      />
      <FormMultiInput
        id="exercise-preferences"
        label="Exercise Preferences"
        value={preference}
        setValue={setPreference}
      />
      <FormMultiInput
        id="equipment-availability"
        label="Equipment Availability"
        value={equipment}
        setValue={setEquipment}
      />
      <Grid item xs={12} sm={6} />
      <Grid item xs={12} sm={5} />
      <Grid item xs={12} sm={4}>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Grid>
      <Grid item xs={12} sm={5} />
    </PaperForm>
  );
}

AdditionalProfileForm.propTypes = {
  setUpdatingProfile: PropTypes.func,
};

AdditionalProfileForm.defaultProps = {
  setUpdatingProfile: () => {},
};
