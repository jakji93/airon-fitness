import { Grid, Button } from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

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

const validationSchema = yup.object({
  bodyFat: yup
    .number().min(0).max(100),
  muscleMass: yup
    .number().min(0).max(100),
  duration: yup
    .number().min(0),
  weeklyAvailability: yup
    .string('Enter your weeklyAvailability')
    .oneOf(weeklyAvailabilityOptions, 'Must use preset option'),
});

export default function AdditionalProfileForm(props) {
  const {
    setUpdatingProfile,
  } = props;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.userProfile.profile);
  const formik = useFormik({
    initialValues: {
      healthConditions: profile?.healthConditions ?? [],
      dietRestriction: profile?.dietRestriction ?? [],
      allergies: profile?.allergies ?? [],
      weeklyAvailability: profile?.weeklyAvailability ?? '',
      bodyFat: profile?.bodyFat ?? 0,
      muscleMass: profile?.muscleMass ?? 0,
      duration: profile?.duration ?? 0,
      preference: profile?.preference ?? [],
      equipment: profile?.equipment ?? [],
    },
    validationSchema,
    onSubmit: (values) => {
      setUpdatingProfile(true);
      dispatch(updateUserProfile({
        healthConditions: values.healthConditions,
        dietRestriction: values.dietRestriction,
        allergies: values.allergies,
        weeklyAvailability: values.weeklyAvailability,
        bodyFat: values.bodyFat,
        muscleMass: values.muscleMass,
        duration: values.duration,
        preference: values.preference,
        equipment: values.equipment,
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
      formTitle="Update Additional Profile"
    >
      <FormTextFieldInput
        id="bodyFat"
        label="Body Fat Percentage"
        half
        endAdornment="%"
        value={formik.values.bodyFat}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.bodyFat && Boolean(formik.errors.bodyFat)}
        helperText={formik.touched.bodyFat && formik.errors.bodyFat}
        size="medium"
      />
      <FormTextFieldInput
        id="muscleMass"
        label="Muscle Mass Percentage"
        half
        endAdornment="%"
        value={formik.values.muscleMass}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.muscleMass && Boolean(formik.errors.muscleMass)}
        helperText={formik.touched.muscleMass && formik.errors.muscleMass}
        size="medium"
      />
      <FormMultiSelect
        id="healthConditions"
        label="Health Conditions & Injuries"
        options={healthConditionsAndInjuriesOptions}
        showTitleLabel
        value={formik.values.healthConditions}
        setFieldValue={formik.setFieldValue}
        size="medium"
      />
      <FormMultiSelect
        id="dietRestriction"
        label="Dietary Restrictions"
        options={dietaryRestrictionsOptions}
        showTitleLabel
        value={formik.values.dietRestriction}
        setFieldValue={formik.setFieldValue}
        size="medium"
      />
      <FormMultiSelect
        id="allergies"
        label="Allergies & Intolerances"
        options={allergiesIntolerancesOptions}
        showTitleLabel
        value={formik.values.allergies}
        setFieldValue={formik.setFieldValue}
        size="medium"
      />
      <FormSelect
        id="weeklyAvailability"
        label="Weekly Availability"
        options={weeklyAvailabilityOptions}
        half
        endAdornment="days"
        showTitleLabel
        value={formik.values.weeklyAvailability}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.weeklyAvailability && Boolean(formik.errors.weeklyAvailability)}
        helperText={formik.touched.weeklyAvailability && formik.errors.weeklyAvailability}
        size="medium"
      />
      <FormTextFieldInput
        id="duration"
        label="Workout Duration"
        half
        endAdornment="minutes"
        value={formik.values.duration}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.duration && Boolean(formik.errors.duration)}
        helperText={formik.touched.duration && formik.errors.duration}
        size="medium"
      />
      <FormMultiInput
        id="preference"
        label="Exercise Preferences"
        value={formik.values.preference}
        setFieldValue={formik.setFieldValue}
        size="medium"
      />
      <FormMultiInput
        id="equipment"
        label="Equipment Availability"
        value={formik.values.equipment}
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

AdditionalProfileForm.propTypes = {
  setUpdatingProfile: PropTypes.func,
};

AdditionalProfileForm.defaultProps = {
  setUpdatingProfile: () => {},
};
