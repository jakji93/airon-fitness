import {
  Box, Typography, Grid, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {
  healthConditionsAndInjuriesOptions, dietaryRestrictionsOptions,
  allergiesIntolerancesOptions, weeklyAvailabilityOptions,
} from '../../constants/AdditionalProfile';
import { experienceOptions } from '../../constants/BasicProfile';
import FormMultiSelect from '../Profile/Forms/FormMultiSelect';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldWithRadio from '../Profile/Forms/FormTextWithRadio';

const classes = {
  root: {
    flexGrow: 1,
    margin: '2px',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridItem: {
    padding: '2px',
  },
  selectForm: {
    marginTop: '12px',
    marginLeft: '12px',
  },
  toggleForm: {
    marginTop: '12px',
  },
};

export default function SignupStats({ setUser, nextStage }) {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [experience, setExperience] = useState('');
  const [healthConditionsAndInjuries, setHealthConditionsAndInjuries] = useState([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
  const [allergiesIntolerances, setAllergiesIntolerances] = useState([]);
  const [weeklyAvailability, setWeeklyAvailability] = useState([]);

  const handleSubmit = (e) => {
    setUser((prevState) => ({
      ...prevState, weight, height, experience,
    }));
    nextStage(e);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Lastly, we will need some background information
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={classes.root}>
        <Grid container spacing={2} sx={classes.toggleForm}>
          <Grid container item spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
            <FormTextFieldWithRadio
              id="weight"
              label="Weight"
              showTitleLabel={false}
              value={weight}
              setValue={setWeight}
              type="number"
              radioGroups={['lb', 'kg']}
              displayFlex
            />
            <FormTextFieldWithRadio
              id="height"
              label="Height"
              showTitleLabel={false}
              value={height}
              setValue={setHeight}
              type="number"
              radioGroups={['cm', 'in']}
              displayFlex
            />
          </Grid>
          <Grid container spacing={2} sx={classes.selectForm}>
            <Grid item sm={12} lg={6} xl={4}>
              <FormSelect
                id="experience"
                label="Experience"
                showTitleLabel={false}
                options={experienceOptions}
                setValue={setExperience}
                value={experience}
                limitWidth
                flexbox
              />
            </Grid>
            <Grid item sm={12} md={8} lg={6} xl={4}>
              <FormMultiSelect
                id="health-conditions-and-injuries"
                label="Health Conditions & Injuries"
                value={healthConditionsAndInjuries}
                setValue={setHealthConditionsAndInjuries}
                options={healthConditionsAndInjuriesOptions}
                showTitleLabel={false}
                constantWidth
              />
            </Grid>
            <Grid item sm={12} md={8} lg={6} xl={4}>
              <FormMultiSelect
                id="allergies-intolerances"
                label="Allergies & Intolerances"
                value={allergiesIntolerances}
                setValue={setAllergiesIntolerances}
                options={allergiesIntolerancesOptions}
                showTitleLabel={false}
                constantWidth
              />
            </Grid>
            <Grid item sm={12} md={8} lg={6} xl={4}>
              <FormSelect
                id="weekly-availability"
                label="Weekly Availability"
                value={weeklyAvailability}
                setValue={setWeeklyAvailability}
                options={weeklyAvailabilityOptions}
                showTitleLabel={false}
                limitWidth
                flexbox
                endAdornment="days"
              />
            </Grid>
            <Grid item sm={12} md={8} lg={6} xl={4}>
              <FormMultiSelect
                id="dietary-restrictions"
                label="Dietary Restrictions"
                value={dietaryRestrictions}
                setValue={setDietaryRestrictions}
                options={dietaryRestrictionsOptions}
                showTitleLabel={false}
                constantWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, width: '300px' }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}

SignupStats.propTypes = {
  nextStage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
