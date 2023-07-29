import {
  Button,
  Link,
  Grid,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { register, resetAuth } from '../../reducers/Auth';
import { setSignup } from '../../reducers/Signup';
import { ToastContext } from '../common/context/ToastContextProvider';
import Spinner from '../common/Spinner';
import Form from '../Profile/Forms/Form';
import FormTextFieldInput from '../Profile/Forms/FormTextFieldInput';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function SignupRegisterAccount() {
  const openToast = useContext(ToastContext);
  const {
    user, isLoading, isError, isSuccess, message,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { step } = useSelector((state) => state.signup);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(register({ email: values.email, password: values.password }));
    },
  });

  useEffect(() => {
    if (isError) {
      openToast('error', message);
    }

    if (isSuccess && user) {
      openToast('success', 'Your account has been created! Please setup your user profile 🫡');
    }

    if (user) dispatch(setSignup({ step: step + 1 }));

    dispatch(resetAuth());
  }, [user, isError, isSuccess, message, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  const handleGoogleSignupSuccess = (res) => {
    const credentials = jwt_decode(res.credential);
    dispatch(register({
      email: credentials.email,
      password: credentials.sub,
    }));
    dispatch(setSignup({
      user: {
        firstName: credentials.given_name,
        lastName: credentials.family_name,
      },
      step,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="Create Your Account"
      containerSx={{ width: '80vw', maxWidth: '550px' }}
      centerTitle
    >
      <FormTextFieldInput
        id="email"
        label="Email Address"
        showTitleLabel={false}
        autoComplete="email"
        customTextFieldGridSize={12}
        required
        placeholder="johndoe@email.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        size="medium"
      />
      <FormTextFieldInput
        id="password"
        label="Password"
        showTitleLabel={false}
        autoComplete="password"
        customTextFieldGridSize={12}
        required
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        size="medium"
      />
      <FormTextFieldInput
        id="confirmPassword"
        label="Confirm Password"
        showTitleLabel={false}
        autoComplete="confirm-password"
        customTextFieldGridSize={12}
        required
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        size="medium"
      />
      <Grid item xs={12} sm={6}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: '100%', height: '100%' }}
          disabled={formik.isSubmitting}
        >
          Create Account
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <GoogleLogin
          onSuccess={handleGoogleSignupSuccess}
          onError={() => {
            openToast('error', 'Google Authentication Failed');
          }}
          size="medium"
        />
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Form>
  );
}
