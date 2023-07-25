import {
  Grid, Button,
} from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { genderOptions } from '../../constants/BasicProfile';
import { resetAuth } from '../../reducers/Auth';
import { setSignup } from '../../reducers/Signup';
import { ToastContext } from '../common/context/ToastContextProvider';
import Spinner from '../common/Spinner';
import Form from '../Profile/Forms/Form';
import FormDatePicker from '../Profile/Forms/FormDatePicker';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldInput from '../Profile/Forms/FormTextFieldInput';

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
});

export default function SignupBasicUserDetails() {
  const {
    user, isLoading, isError, isSuccess, message,
  } = useSelector((state) => state.auth);
  const openToast = useContext(ToastContext);
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const initialValues = {
    gender: signup.user.gender ?? '',
    firstName: signup.user.firstName,
    lastName: signup.user.lastName,
    birthday: dayjs(signup.user.birthday) ?? dayjs(),
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (values.birthday.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
        openToast('error', 'Please add your birthday', 3000);
        return;
      }

      dispatch(setSignup({
        user: {
          gender: values.gender,
          firstName: values.firstName,
          lastName: values.lastName,
          birthday: values.birthday.format('YYYY-MM-DD'),
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

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  useEffect(() => {
    if (isError) {
      openToast('error', message);
    }

    if (isSuccess || user) {
      openToast('success', 'Your account has been created! Please setup your user profile 🫡');
    }

    dispatch(resetAuth);
  }, [user, isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="Welcome to Ai-ron Fitness! Let&apos;s get a profile tailored for you."
      containerSx={{ width: '80vw', maxWidth: '675px' }}
      centerTitle
    >
      <FormTextFieldInput
        half
        id="firstName"
        label="First Name"
        showTitleLabel={false}
        autoComplete="given-name"
        customTextFieldGridSize={6}
        required
        placeholder="John"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        size="medium"
      />
      <FormTextFieldInput
        half
        id="lastName"
        label="Last Name"
        showTitleLabel={false}
        autoComplete="family-name"
        customTextFieldGridSize={6}
        required
        placeholder="Doe"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        size="medium"
      />
      <FormSelect
        id="gender"
        label="Gender *"
        showTitleLabel={false}
        options={genderOptions}
        required
        customTextFieldGridSize={6}
        value={formik.values.gender}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.gender && Boolean(formik.errors.gender)}
        helperText={formik.touched.gender && formik.errors.gender}
        size="medium"
      />
      <FormDatePicker
        half
        id="birthday"
        label="Born"
        showTitleLabel={false}
        customTextFieldGridSize={6}
        name="birthday"
        disableFuture
        setFieldValue={formik.setFieldValue}
        value={formik.values.birthday}
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
