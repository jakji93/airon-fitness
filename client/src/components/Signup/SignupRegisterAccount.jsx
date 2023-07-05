import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register, resetAuth } from '../../reducers/Auth';
import { setSignup } from '../../reducers/Signup';
import { ToastContext } from '../common/context/ToastContextProvider';
import Spinner from '../common/Spinner';

export default function SignupRegisterAccount() {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.signup.step);
  const openToast = useContext(ToastContext);
  const {
    user, isLoading, isError, isSuccess, message,
  } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      email, password, confirmPassword,
    } = e.target;

    if (password.value !== confirmPassword.value) {
      openToast('error', "Password's do not match");
      return;
    }
    dispatch(register({ email: email.value, password: password.value }));
  };

  useEffect(() => {
    if (isError) {
      openToast('error', message);
    }

    if (isSuccess || user) {
      openToast('success', 'You\'re account has been created!');
      dispatch(setSignup({ step: step + 1 }));
    }

    dispatch(resetAuth);
  }, [user, isError, isSuccess, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
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
          <Typography component="h1" variant="h5">
            Create Your Account
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center',
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '300px' }}
            >
              Create Account
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
