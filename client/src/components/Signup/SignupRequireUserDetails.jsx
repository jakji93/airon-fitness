import {
  Grid, Button,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import {
  HEIGHT_UNITS,
  WEIGHT_UNITS, experienceOptions, goalsOptions,
} from '../../constants/BasicProfile';
import { setSignup } from '../../reducers/Signup';
import Form from '../Profile/Forms/Form';
import FormMultiSelect from '../Profile/Forms/FormMultiSelect';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldWithRadio from '../Profile/Forms/FormTextWithRadio';

const validationSchema = yup.object({
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
});

export default function SignupRequireUserDetails() {
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const initialValues = {
    weight: signup.user.weight ?? '',
    height: signup.user.height ?? '',
    weightUnit: signup.user.weightUnit ?? WEIGHT_UNITS.KG,
    heightUnit: signup.user.heightUnit ?? HEIGHT_UNITS.IN,
    experience: signup.user.experience ?? '',
    goals: signup.user.goals ?? [],
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(setSignup({
        user: {
          weight: values.weight,
          height: values.height,
          weightUnit: values.weightUnit,
          heightUnit: values.heightUnit,
          experience: values.experience,
          goals: values.goals,
        },
        step: signup.step + 1,
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
        weight: formik.values.weight,
        height: formik.values.height,
        weightUnit: formik.values.weightUnit,
        heightUnit: formik.values.heightUnit,
        experience: formik.values.experience,
        goals: formik.values.goals,
      },
      step: signup.step - 1,
    }));
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      formTitle="We will need some important information to tailor a plan for you"
      containerSx={{ width: '80vw', maxWidth: '800px' }}
      centerTitle
    >
      <FormTextFieldWithRadio
        id="weight"
        label="Weight"
        showTitleLabel={false}
        type="number"
        radioGroups={['lb', 'kg']}
        half
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
        showTitleLabel={false}
        type="number"
        radioGroups={['cm', 'in']}
        half
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
      <FormMultiSelect
        id="goals"
        label="Goals"
        options={goalsOptions}
        showTitleLabel={false}
        customTextFieldGridSize={12}
        value={formik.values.goals}
        required
        error={formik.touched.goals && Boolean(formik.errors.goals)}
        helperText={formik.touched.goals && formik.errors.goals}
        onBlur={formik.handleBlur}
        setFieldValue={formik.setFieldValue}
        size="medium"
      />
      <FormSelect
        id="experience"
        label="Experience"
        options={experienceOptions}
        showTitleLabel={false}
        customTextFieldGridSize={6}
        value={formik.values.experience}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.experience && Boolean(formik.errors.experience)}
        helperText={formik.touched.experience && formik.errors.experience}
        size="medium"
        required
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
