import {
  Grid, Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  HEIGHT_UNITS,
  WEIGHT_UNITS, experienceOptions, goalsOptions,
} from '../../constants/BasicProfile';
import { setSignup } from '../../reducers/Signup';
import Form from '../Profile/Forms/Form';
import FormMultiSelect from '../Profile/Forms/FormMultiSelect';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldWithRadio from '../Profile/Forms/FormTextWithRadio';

export default function SignupRequireUserDetails() {
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const [weight, setWeight] = useState(signup.user.weight ?? null);
  const [height, setHeight] = useState(signup.user.height ?? null);
  const [weightUnit, setWeightUnit] = useState(signup.user.weightUnit ?? WEIGHT_UNITS.KG);
  const [heightUnit, setHeightUnit] = useState(signup.user.heightUnit ?? HEIGHT_UNITS.IN);
  const [experience, setExperience] = useState(signup.user.experience ?? '');
  const [goals, setGoals] = useState(signup.user.goals ?? []);

  const handleSubmit = () => {
    dispatch(setSignup({
      user: {
        weight,
        height,
        weightUnit,
        heightUnit,
        experience,
        goals,
      },
      step: signup.step + 1,
    }));
  };

  const handleBack = () => {
    dispatch(setSignup({
      user: {
        weight,
        height,
        weightUnit,
        heightUnit,
        experience,
        goals,
      },
      step: signup.step - 1,
    }));
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="We will need some important information to tailor a plan for you"
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
        half
        radioSelection={weightUnit}
        setRadioSelection={setWeightUnit}
        required
      />
      <FormTextFieldWithRadio
        id="height"
        label="Height"
        showTitleLabel={false}
        value={height}
        setValue={setHeight}
        type="number"
        radioGroups={['cm', 'in']}
        half
        radioSelection={heightUnit}
        setRadioSelection={setHeightUnit}
        required
      />
      <FormMultiSelect
        id="goals"
        label="Goals"
        value={goals}
        setValue={setGoals}
        options={goalsOptions}
        showTitleLabel={false}
        required
        customTextFieldGridSize={12}
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
      <Grid
        item
        xs={12}
        sm={6}
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
          Next
        </Button>
      </Grid>
    </Form>
  );
}
