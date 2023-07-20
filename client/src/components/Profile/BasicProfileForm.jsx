import {
  Grid, Button,
} from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

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

const validationSchema = yup.object({
  gender: yup
    .string('Select a gender')
    .oneOf(genderOptions, 'Must use available gender'),
  firstName: yup
    .string('Enter your first name')
    .required('first name is required'),
  lastName: yup
    .string('Enter your last name')
    .required('last name is required'),
  birthday: yup
    .date('Enter your birthday')
    .required('birthday is required'),
  weight: yup
    .number('Enter your weight')
    .required('weight is required'),
  height: yup
    .number('Enter your height')
    .required('height is required'),
  weightUnit: yup
    .string()
    .required(),
  heightUnit: yup
    .string()
    .required(),
  experience: yup
    .string('Enter your experience')
    .oneOf(experienceOptions, 'Must use preset option')
    .required('experience is required'),
  goals: yup
    .array('Enter your goals')
    .of(yup.string().oneOf(goalsOptions, 'Must use preset option'))
    .min(1, 'At least one goal is required')
    .required('goals are required'),
  apiKey: yup
    .string('Select a gender')
    .required('api key is required'),
});

export default function BasicProfileForm(props) {
  const {
    setUpdatingProfile,
  } = props;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userProfile.profile);
  const formik = useFormik({
    initialValues: {
      firstName: profile?.firstName ?? '',
      lastName: profile?.lastName ?? '',
      birthday: dayjs(profile?.birthday) ?? null,
      gender: profile?.gender ?? '',
      weight: profile?.weight ?? 0,
      height: profile?.height ?? 0,
      weightUnit: profile?.weightUnit ?? WEIGHT_UNITS.KG,
      heightUnit: profile?.heightUnit ?? HEIGHT_UNITS.IN,
      experience: profile?.experience ?? '',
      goals: profile?.goals ?? [],
      apiKey: profile?.apiKey ?? '',
    },
    validationSchema,
    onSubmit: (values) => {
      setUpdatingProfile(true);
      dispatch(updateUserProfile({
        firstName: values.firstName,
        lastName: values.lastName,
        birthday: values.birthday,
        gender: values.gender,
        weight: values.weight,
        height: values.height,
        weightUnit: values.weightUnit,
        heightUnit: values.heightUnit,
        experience: values.experience,
        goals: values.goals,
        apiKey: values.apiKey,
      }));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <PaperForm
      handleSubmit={handleSubmit}
      formTitle="Update Basic Profile"
    >
      <FormTextFieldInput
        id="firstName"
        label="First Name"
        half
        showTitleLabel
        placeholder="John"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        size="medium"
        required
        autoComplete="given-name"
      />
      <FormTextFieldInput
        id="lastName"
        label="Last Name"
        half
        showTitleLabel
        placeholder="Doe"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        size="medium"
        required
        autoComplete="family-name"
      />
      <FormDatePicker
        half
        id="birthday"
        label="Born"
        showTitleLabel
        disableFuture
        setFieldValue={formik.setFieldValue}
        value={formik.values.birthday}
        name="birthday"
      />
      <FormSelect
        half
        id="gender"
        label="Gender"
        options={genderOptions}
        showTitleLabel
        value={formik.values.gender}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.gender && Boolean(formik.errors.gender)}
        helperText={formik.touched.gender && formik.errors.gender}
        size="medium"
        required
      />
      <FormTextFieldWithRadio
        id="weight"
        label="Weight"
        type="number"
        radioGroups={weightUnitOptions}
        showTitleLabel
        value={formik.values.weight}
        onChange={formik.handleChange}
        radioId="weightUnit"
        radioSelection={formik.values.weightUnit}
        onChangeRadio={formik.handleChange}
        error={formik.touched.weight && Boolean(formik.errors.weight)}
        helperText={formik.touched.weight && formik.errors.weight}
        onBlur={formik.handleBlur}
        placeholder="69"
        size="medium"
        required
      />
      <FormTextFieldWithRadio
        id="height"
        label="Height"
        type="number"
        radioGroups={heightUnitOptions}
        showTitleLabel
        required
        radioId="heightUnit"
        value={formik.values.height}
        onChange={formik.handleChange}
        radioSelection={formik.values.heightUnit}
        onChangeRadio={formik.handleChange}
        error={formik.touched.height && Boolean(formik.errors.height)}
        helperText={formik.touched.height && formik.errors.height}
        onBlur={formik.handleBlur}
        placeholder="69"
        size="medium"
      />
      <FormSelect
        half
        id="experience"
        label="Experience"
        options={experienceOptions}
        showTitleLabel
        value={formik.values.experience}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.experience && Boolean(formik.errors.experience)}
        helperText={formik.touched.experience && formik.errors.experience}
        size="medium"
        required
      />
      <FormTextFieldInput
        id="apiKey"
        label="API Key"
        showTitleLabel
        autoComplete="apiKey"
        required
        half
        value={formik.values.apiKey}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.apiKey && Boolean(formik.errors.apiKey)}
        helperText={formik.touched.apiKey && formik.errors.apiKey}
        size="medium"
      />
      <FormMultiSelect
        id="goals"
        label="Goals"
        options={goalsOptions}
        showTitleLabel
        value={formik.values.goals}
        required
        error={formik.touched.goals && Boolean(formik.errors.goals)}
        helperText={formik.touched.goals && formik.errors.goals}
        onBlur={formik.handleBlur}
        setFieldValue={formik.setFieldValue}
        size="medium"
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
