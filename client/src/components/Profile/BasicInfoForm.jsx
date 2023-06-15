import {
  Grid, Button,
} from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';

import Form from './Forms/Form';
import FormDatePicker from './Forms/FormDatePicker';
import FormMultiSelect from './Forms/FormMultiSelect';
import FormSelect from './Forms/FormSelect';
import FormTextFieldInput from './Forms/FormTextFieldInput';
import FormTextFieldWithRadio from './Forms/FormTextWithRadio';
import { genderOptions, experienceOptions, goalsOptions } from '../../constants';
import { convertInchesToCm, convertLbToKg } from '../../util';

export default function BasicInfoForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [experience, setExperience] = useState('');
  const [goals, setGoals] = useState([]);

  const clear = () => {
    setFirstName('');
    setLastName('');
    setBirthDate(null);
    setGender('');
    setWeight(0);
    setHeight(0);
    setExperience('');
    setGoals([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      'firstName: ': firstName,
      'lastName: ': lastName,
      'birthDate: ': birthDate,
      'gender: ': gender,
      'weight: ': weight,
      'height: ': height,
      'experience: ': experience,
      'goals: ': goals,
    });

    clear();
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="Update Basic Profile"
    >
      <FormTextFieldInput
        id="first-name"
        label="First Name"
        half
        value={firstName}
        setValue={setFirstName}
      />
      <FormTextFieldInput
        id="last-name"
        label="Last Name"
        half
        value={lastName}
        setValue={setLastName}
      />
      <FormDatePicker
        half
        id="birthdate"
        label="Born"
        setValue={setBirthDate}
        value={birthDate}
      />
      <FormSelect
        half
        id="gender"
        label="Gender"
        options={genderOptions}
        setValue={setGender}
        value={gender}
      />
      <FormTextFieldWithRadio
        id="weight"
        label="Weight"
        value={weight}
        setValue={setWeight}
        type="number"
        radioGroups={['kg', 'lb']}
        conversionFunctions={[_.noop, convertLbToKg]}
      />
      <FormTextFieldWithRadio
        id="height"
        label="Height"
        value={height}
        setValue={setHeight}
        type="number"
        radioGroups={['cm', 'inch']}
        conversionFunctions={[_.noop, convertInchesToCm]}
      />
      <FormSelect
        half
        id="experience"
        label="Experience"
        options={experienceOptions}
        setValue={setExperience}
        value={experience}
      />
      <Grid item xs={12} sm={6} />
      <FormMultiSelect
        id="goals"
        label="Goals"
        value={goals}
        setValue={setGoals}
        options={goalsOptions}
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
