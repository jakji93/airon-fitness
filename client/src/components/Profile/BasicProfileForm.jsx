import {
  Grid, Button,
} from '@mui/material';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormDatePicker from './Forms/FormDatePicker';
import FormMultiSelect from './Forms/FormMultiSelect';
import FormSelect from './Forms/FormSelect';
import FormTextFieldInput from './Forms/FormTextFieldInput';
import FormTextFieldWithRadio from './Forms/FormTextWithRadio';
import PaperForm from './Forms/PaperForm';
import {
  genderOptions,
  experienceOptions,
  goalsOptions,
  weightUnitOptions,
  HEIGHT_UNITS,
  WEIGHT_UNITS,
  heightUnitOptions,
} from '../../constants/BasicProfile';
import { updateUserProfile } from '../../reducers/UserProfile';

export default function BasicProfileForm(props) {
  const {
    setUpdatingProfile,
  } = props;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userProfile.profile);

  const [firstName, setFirstName] = useState(profile?.firstName ?? '');
  const [lastName, setLastName] = useState(profile?.lastName ?? '');
  const [birthday, setBirthday] = useState(dayjs(profile?.birthday) ?? null);
  const [gender, setGender] = useState(profile?.gender ?? '');
  const [weight, setWeight] = useState(profile?.weight ?? 0);
  const [height, setHeight] = useState(profile?.height ?? 0);
  const [weightUnit, setWeightUnit] = useState(profile?.weightUnit ?? WEIGHT_UNITS.KG);
  const [heightUnit, setHeightUnit] = useState(profile?.heightUnit ?? HEIGHT_UNITS.IN);
  const [experience, setExperience] = useState(profile?.experience ?? '');
  const [goals, setGoals] = useState(profile?.goals ?? []);
  const [apiKey, setApiKey] = useState(profile?.apiKey ?? '');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName ?? '');
      setLastName(profile.lastName ?? '');
      setBirthday(dayjs(profile.birthday) ?? null);
      setGender(profile.gender ?? '');
      setWeight(profile.weight ?? 0);
      setHeight(profile.height ?? 0);
      setWeightUnit(profile.weightUnit ?? WEIGHT_UNITS.KG);
      setHeightUnit(profile.heightUnit ?? HEIGHT_UNITS.IN);
      setExperience(profile.experience ?? '');
      setGoals(profile.goals ?? []);
      setApiKey(profile.apiKey ?? '');
    }
  }, [profile, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setUpdatingProfile(true);
    dispatch(updateUserProfile({
      firstName,
      lastName,
      birthday,
      gender,
      weight,
      height,
      weightUnit,
      heightUnit,
      experience,
      goals,
      apiKey,
    }));
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
        setValue={setBirthday}
        value={birthday}
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
        radioSelection={weightUnit}
        setRadioSelection={setWeightUnit}
        type="number"
        radioGroups={weightUnitOptions}
        showTitleLabel
      />
      <FormTextFieldWithRadio
        id="height"
        label="Height"
        value={height}
        setValue={setHeight}
        radioSelection={heightUnit}
        setRadioSelection={setHeightUnit}
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
      <FormTextFieldInput
        id="api-key"
        label="API Key"
        value={apiKey}
        setValue={setApiKey}
        showTitleLabel
        autoComplete="api-key"
        required
        half
      />
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

BasicProfileForm.propTypes = {
  setUpdatingProfile: PropTypes.func,
};

BasicProfileForm.defaultProps = {
  setUpdatingProfile: () => {},
};
