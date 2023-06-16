import { Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from './Forms/Form';
import FormMultiSelect from './Forms/FormMultiSelect';
import fetchAdditionalProfile from '../../actionCreators/AdditionalProfile';
import {
  healthConditionsAndInjuriesOptions,
  dietaryRestrictionsOptions,
  allergiesIntolerancesOptions,
  weeklyAvailabilityOptions,
} from '../../constants/AdditionalProfile';

export default function AdditionalProfileForm() {
  const [healthConditionsAndInjuries, setHealthConditionsAndInjuries] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [allergiesIntolerances, setAllergiesIntolerances] = useState([]);
  const [weeklyAvailability, setWeeklyAvailability] = useState([]);
  const additionalProfile = useSelector((state) => state.additionalProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdditionalProfile());
  }, [dispatch]);

  useEffect(() => {
    if (additionalProfile.loading && additionalProfile.error) return;
    setHealthConditionsAndInjuries(additionalProfile.profile.healthConditionsInjuries);
    setDietaryRestrictions(additionalProfile.profile.dietaryRestrictions);
    setAllergiesIntolerances(additionalProfile.profile.allergiesIntolerances);
    setWeeklyAvailability(additionalProfile.profile.weeklyAvailability);
  }, [additionalProfile]);

  const clear = () => {
    setHealthConditionsAndInjuries([]);
    setDietaryRestrictions([]);
    setAllergiesIntolerances([]);
    setWeeklyAvailability([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      'healthConditionsAndInjuries: ': healthConditionsAndInjuries,
      'dietaryRestrictions: ': dietaryRestrictions,
      'allergiesIntolerances: ': allergiesIntolerances,
      'workoutDayOfWeek: ': weeklyAvailability,

    });

    clear();
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="Update Additional Profile"
    >
      <FormMultiSelect
        id="health-conditions-and-injuries"
        label="Health Conditions & Injuries"
        value={healthConditionsAndInjuries}
        setValue={setHealthConditionsAndInjuries}
        options={healthConditionsAndInjuriesOptions}
      />
      <FormMultiSelect
        id="dietary-restrictions"
        label="Dietary Restrictions"
        value={dietaryRestrictions}
        setValue={setDietaryRestrictions}
        options={dietaryRestrictionsOptions}
      />
      <FormMultiSelect
        id="allergies-intolerances"
        label="Allergies & Intolerances"
        value={allergiesIntolerances}
        setValue={setAllergiesIntolerances}
        options={allergiesIntolerancesOptions}
      />
      <FormMultiSelect
        id="weekly-availability"
        label="Weekly Availability"
        value={weeklyAvailability}
        setValue={setWeeklyAvailability}
        options={weeklyAvailabilityOptions}
      />
      <Grid item xs={12} sm={6} />
      <Grid item xs={12} sm={5} />
      <Grid item xs={12} sm={4}>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Grid>
      <Grid item xs={12} sm={5} />
    </Form>
  );
}
