import {
  Box, CssBaseline, Grid, TextField, Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/system';
import { GoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik';
import { gapi } from 'gapi-script';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import * as yup from 'yup';

import AironLogo from '../assets/design/GradientLogo1.png';
import { ToastContext } from '../components/common/context/ToastContextProvider';
import RelativeSpinner from '../components/common/RelativeSpinner';
import {
  googleLogin, login, register, resetAuth,
} from '../reducers/Auth';
import { removeSignup, setSignup } from '../reducers/Signup';
import { StyledButton } from '../styled';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function Login() {
  const openToast = useContext(ToastContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    user, isLoading, isError, isSuccess, message, redirectSignup,
  } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({});
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login({
        email: values.email,
        password: values.password,
      }));
    },
  });

  useEffect(() => {
    if (isError && message) {
      openToast('error', message);
    }

    if (isSuccess && user) openToast('success', 'You\'ve been logged in');
    if (isSuccess || user) navigate('/app');

    dispatch(resetAuth());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    if (redirectSignup) {
      dispatch(register({
        email: credentials.email,
        password: credentials.sub,
      }));
      dispatch(setSignup({
        user: {
          firstName: credentials.given_name,
          lastName: credentials.family_name,
        },
        step: 1,
      }));
      navigate('/signup');
    }
  }, [redirectSignup, credentials]);

  const initializeGapi = () => {
    gapi.auth2.init({
      clientId: process.env.REACT_APP_GCP_CLIENT_ID,
      scope: '',
    });
  };

  useEffect(() => {
    gapi.load('client:auth2', initializeGapi);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  const handleGoogleLoginSuccess = async (res) => {
    const creds = jwt_decode(res.credential);
    setCredentials(creds);
    dispatch(googleLogin({
      email: creds.email,
      password: creds.sub,
    }));
  };

  if (isLoading) {
    return <RelativeSpinner />;
  }

  return (
    <Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={AironLogo}
            alt="logo"
            style={{
              width: '100%',
            }}
          />

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  placeholder="johndoe@email.com"
                  variant="filled"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={{ backgroundColor: theme.palette.secondary.light }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="filled"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{ backgroundColor: theme.palette.secondary.light }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ width: '100%', height: '100%' }}
                >
                  <Box
                    sx={{
                      color: theme.palette.secondary.dark,
                      fontFamily: theme.typography.fontFamily,
                    }}
                  >
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter.changeDelay(40)
                          .typeString('LOGIN')
                          .start();
                      }}
                    />
                  </Box>
                </StyledButton>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => {
                    openToast('error', 'Google Authentication Failed');
                  }}
                  size="medium"
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                justifyContent: {
                  sm: 'flex-end',
                  xs: 'center',
                },
              }}
            >
              <Grid item sx={{ mt: 1 }}>
                <Link
                  to="/signup"
                  variant="body2"
                  style={{ color: theme.palette.secondary.main }}
                  onClick={() => {
                    dispatch(removeSignup());
                  }}
                >
                  Don&apos;t have an account? Create one.
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Typography variant="body1" color={theme.palette.secondary.light} align="center" sx={{ mt: 3 }}>
            Disclaimer: This app is hosted on a free platform
            so the server may need a second to wake up!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
