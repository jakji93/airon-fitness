import {
  Grid, Button,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormDatePicker from './Forms/FormDatePicker';
import FormMultiSelect from './Forms/FormMultiSelect';
import FormSelect from './Forms/FormSelect';
import FormTextFieldInput from './Forms/FormTextFieldInput';
import FormTextFieldWithRadio from './Forms/FormTextWithRadio';
import PaperForm from './Forms/PaperForm';
import fetchBasicProfile from '../../actionCreators/BasicProfile';
import {
  genderOptions,
  experienceOptions,
  goalsOptions,
  weightUnitOptions,
  HEIGHT_UNITS,
  WEIGHT_UNITS,
  heightUnitOptions,
} from '../../constants/BasicProfile';

export default function BasicProfileForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [weightUnits, setWeightUnits] = useState(WEIGHT_UNITS.KG);
  const [heightUnits, setHeightUnits] = useState(HEIGHT_UNITS.IN);
  const [experience, setExperience] = useState('');
  const [goals, setGoals] = useState([]);

  const basicProfile = useSelector((state) => state.basicProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBasicProfile());
  }, [dispatch]);

  useEffect(() => {
    // TODO: uncomment this when backend api is set up
    // if (basicProfile.loading || basicProfile.error !== '') return;
    setFirstName(basicProfile.profile.firstName);
    setLastName(basicProfile.profile.lastName);
    setDateOfBirth(dayjs(basicProfile.profile.dateOfBirth));
    setGender(basicProfile.profile.gender);
    setWeight(basicProfile.profile.weight.value);
    setHeight(basicProfile.profile.height.value);
    setExperience(basicProfile.profile.experience);
    setGoals(basicProfile.profile.goals);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      'firstName: ': firstName,
      'lastName: ': lastName,
      'birthDate: ': dateOfBirth,
      'gender: ': gender,
      'weight: ': weight,
      'height: ': height,
      'experience: ': experience,
      'goals: ': goals,
    });
  };

  return (
    <PaperForm
      handleSubmit={handleSubmit}
      formTitle="Update Basic Profile"
    >
      <FormTextFieldInput
        id="first-name"
        label="First Name"
        half
        value={firstName}
        setValue={setFirstName}
        showTitleLabel
      />
      <FormTextFieldInput
        id="last-name"
        label="Last Name"
        half
        value={lastName}
        setValue={setLastName}
        showTitleLabel
      />
      <FormDatePicker
        half
        id="birthdate"
        label="Born"
        setValue={setDateOfBirth}
        value={dateOfBirth}
        showTitleLabel
      />
      <FormSelect
        half
        id="gender"
        label="Gender"
        options={genderOptions}
        setValue={setGender}
        value={gender}
        showTitleLabel
      />
      <FormTextFieldWithRadio
        id="weight"
        label="Weight"
        value={weight}
        setValue={setWeight}
        radioSelection={weightUnits}
        setRadioSelection={setWeightUnits}
        type="number"
        radioGroups={weightUnitOptions}
        showTitleLabel
      />
      <FormTextFieldWithRadio
        id="height"
        label="Height"
        value={height}
        setValue={setHeight}
        radioSelection={heightUnits}
        setRadioSelection={setHeightUnits}
        type="number"
        radioGroups={heightUnitOptions}
        showTitleLabel
      />
      <FormSelect
        half
        id="experience"
        label="Experience"
        options={experienceOptions}
        setValue={setExperience}
        value={experience}
        showTitleLabel
      />
      <Grid item xs={12} sm={6} />
      <FormMultiSelect
        id="goals"
        label="Goals"
        value={goals}
        setValue={setGoals}
        options={goalsOptions}
        showTitleLabel
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
