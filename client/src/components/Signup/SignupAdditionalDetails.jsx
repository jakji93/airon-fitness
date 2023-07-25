import {
  Grid, Button,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import {
  healthConditionsAndInjuriesOptions, dietaryRestrictionsOptions,
  allergiesIntolerancesOptions, weeklyAvailabilityOptions,
} from '../../constants/AdditionalProfile';
import { setSignup } from '../../reducers/Signup';
import { registerUserProfile } from '../../reducers/UserProfile';
import Form from '../Profile/Forms/Form';
import FormMultiInput from '../Profile/Forms/FormMultiInput';
import FormMultiSelect from '../Profile/Forms/FormMultiSelect';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldInput from '../Profile/Forms/FormTextFieldInput';

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

export default function SignupAdditionalDetails() {
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const initialValues = {
    healthConditions: signup.user.healthConditions ?? [],
    dietRestriction: signup.user.dietRestriction ?? [],
    allergies: signup.user.allergies ?? [],
    weeklyAvailability: signup.user.weeklyAvailability ?? '',
    bodyFat: signup.user.bodyFat ?? '',
    muscleMass: signup.user.muscleMass ?? '',
    duration: signup.user.duration ?? '',
    preference: signup.user.preference ?? ['e.g. Squat'],
    equipment: signup.user.equipment ?? ['e.g. Dumbbells'],
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(setSignup({
        user: {
          healthConditions: values.healthConditions,
          dietRestriction: values.dietRestriction,
          allergies: values.allergies,
          weeklyAvailability: values.weeklyAvailability,
          bodyFat: values.bodyFat,
          muscleMass: values.muscleMass,
          duration: values.duration,
          preference: values.preference,
          equipment: values.equipment,
        },
        step: signup.step,
      }));
      dispatch(registerUserProfile({
        ...signup.user,
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

  useEffect(() => {
    Object.entries(initialValues).forEach(([fieldName, value]) => {
      formik.setFieldValue(fieldName, value);
    });
  }, [signup]);

  const handleBack = () => {
    dispatch(setSignup({
      user: {
        healthConditions: formik.values.healthConditions,
        dietRestriction: formik.values.dietRestriction,
        allergies: formik.values.allergies,
        weeklyAvailability: formik.values.weeklyAvailability,
        bodyFat: formik.values.bodyFat,
        muscleMass: formik.values.muscleMass,
        duration: formik.values.duration,
        preference: formik.values.preference,
        equipment: formik.values.equipment,
      },
      step: signup.step - 1,
    }));
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      formTitle="Optionally, provide some additional information to further customize your plan"
      containerSx={{ width: '80vw', maxWidth: '675px' }}
      centerTitle
    >
      <FormTextFieldInput
        id="bodyFat"
        label="Body Fat Percentage"
        endAdornment="%"
        customTextFieldGridSize={6}
        showTitleLabel={false}
        type="number"
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
        endAdornment="%"
        customTextFieldGridSize={6}
        showTitleLabel={false}
        type="number"
        value={formik.values.muscleMass}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.muscleMass && Boolean(formik.errors.muscleMass)}
        helperText={formik.touched.muscleMass && formik.errors.muscleMass}
        size="medium"
      />
      <FormTextFieldInput
        id="duration"
        label="Workout Duration"
        endAdornment="minutes"
        customTextFieldGridSize={6}
        showTitleLabel={false}
        type="number"
        value={formik.values.duration}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.duration && Boolean(formik.errors.duration)}
        helperText={formik.touched.duration && formik.errors.duration}
        size="medium"
      />
      <FormSelect
        id="weeklyAvailability"
        label="Weekly Availability"
        options={weeklyAvailabilityOptions}
        showTitleLabel={false}
        endAdornment="days"
        customTextFieldGridSize={6}
        value={formik.values.weeklyAvailability}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.weeklyAvailability && Boolean(formik.errors.weeklyAvailability)}
        helperText={formik.touched.weeklyAvailability && formik.errors.weeklyAvailability}
        size="medium"
      />
      <FormMultiInput
        id="preference"
        label="Exercise Preferences"
        showTitleLabel={false}
        customTextFieldGridSize={12}
        placeholder="e.g. Squats"
        value={formik.values.preference}
        setFieldValue={formik.setFieldValue}
        size="medium"
      />
      <FormMultiInput
        id="equipment"
        label="Equipment Availability"
        showTitleLabel={false}
        customTextFieldGridSize={12}
        placeholder="e.g. Dumbbells"
        value={formik.values.equipment}
        setFieldValue={formik.setFieldValue}
        size="medium"
      />
      <FormMultiSelect
        id="healthConditions"
        label="Health Conditions & Injuries"
        options={healthConditionsAndInjuriesOptions}
        showTitleLabel={false}
        customTextFieldGridSize={12}
        limitTags={3}
        value={formik.values.healthConditions}
        setFieldValue={formik.setFieldValue}
        size="medium"
      />
      <FormMultiSelect
        id="allergies"
        label="Allergies & Intolerances"
        options={allergiesIntolerancesOptions}
        showTitleLabel={false}
        customTextFieldGridSize={12}
        limitTags={3}
        value={formik.values.allergies}
        setFieldValue={formik.setFieldValue}
        size="medium"
      />
      <FormMultiSelect
        id="dietRestriction"
        label="Dietary Restrictions"
        value={formik.values.dietRestriction}
        setFieldValue={formik.setFieldValue}
        options={dietaryRestrictionsOptions}
        showTitleLabel={false}
        customTextFieldGridSize={12}
        limitTags={3}
        size="medium"
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
          Create
        </Button>
      </Grid>
    </Form>
  );
}
