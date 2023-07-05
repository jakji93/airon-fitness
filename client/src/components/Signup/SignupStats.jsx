import {
  Grid, Button,
} from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
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

export default function SignupStats(props) {
  const {
    nextStage,
    prevStage,
    weight, setWeight,
    height, setHeight,
    experience, setExperience,
    healthConditionsAndInjuries, setHealthConditionsAndInjuries,
    dietaryRestrictions, setDietaryRestrictions,
    allergiesIntolerances, setAllergiesIntolerances,
    weeklyAvailability, setWeeklyAvailability,
  } = props;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
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
        sm={6}
      >
        <Button
          onClick={prevStage}
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

SignupStats.propTypes = {
  nextStage: PropTypes.func.isRequired,
  prevStage: PropTypes.func.isRequired,
  weight: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  experience: PropTypes.string.isRequired,
  healthConditionsAndInjuries: PropTypes.arrayOf(PropTypes.string).isRequired,
  dietaryRestrictions: PropTypes.arrayOf(PropTypes.string).isRequired,
  allergiesIntolerances: PropTypes.arrayOf(PropTypes.string).isRequired,
  weeklyAvailability: PropTypes.string.isRequired,
  setWeight: PropTypes.func.isRequired,
  setHeight: PropTypes.func.isRequired,
  setExperience: PropTypes.func.isRequired,
  setHealthConditionsAndInjuries: PropTypes.func.isRequired,
  setDietaryRestrictions: PropTypes.func.isRequired,
  setAllergiesIntolerances: PropTypes.func.isRequired,
  setWeeklyAvailability: PropTypes.func.isRequired,
};
