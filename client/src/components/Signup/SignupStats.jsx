import {
  Grid, Button,
} from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  healthConditionsAndInjuriesOptions, dietaryRestrictionsOptions,
  allergiesIntolerancesOptions, weeklyAvailabilityOptions,
} from '../../constants/AdditionalProfile';
import { experienceOptions } from '../../constants/BasicProfile';
import { convertInchesToCm, convertLbToKg } from '../../util';
import Form from '../Profile/Forms/Form';
import FormMultiSelect from '../Profile/Forms/FormMultiSelect';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldWithRadio from '../Profile/Forms/FormTextWithRadio';

export default function SignupStats({ setUser, nextStage }) {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [experience, setExperience] = useState('');
  const [healthConditionsAndInjuries, setHealthConditionsAndInjuries] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [allergiesIntolerances, setAllergiesIntolerances] = useState([]);
  const [weeklyAvailability, setWeeklyAvailability] = useState('1');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setUser((prevState) => ({
      ...prevState, weight, height, experience,
    }));
    nextStage(e);
    navigate('/app');
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="Lastly, we will need some background information"
      containerSx={{ width: '80vw', maxWidth: '675px' }}
      centerTitle
    >
      <FormTextFieldWithRadio
        id="weight"
        label="Weight"
        showTitleLabel={false}
        value={weight}
        setValue={setWeight}
        type="number"
        radioGroups={['lb', 'kg']}
        conversionFunctions={[_.noop, convertLbToKg]}
        half
      />
      <FormTextFieldWithRadio
        id="height"
        label="Height"
        showTitleLabel={false}
        value={height}
        setValue={setHeight}
        type="number"
        radioGroups={['cm', 'in']}
        conversionFunctions={[_.noop, convertInchesToCm]}
        half
      />
      <FormSelect
        id="experience"
        label="Experience"
        value={experience}
        setValue={setExperience}
        options={experienceOptions}
        showTitleLabel={false}
        customTextFieldGridSize={6}
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
        sm={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{ mb: 2, width: '300px' }}
        >
          Create
        </Button>
      </Grid>
    </Form>
  );
}

SignupStats.propTypes = {
  nextStage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
