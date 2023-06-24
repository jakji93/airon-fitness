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
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';

import { ToastContext } from '../common/context/ToastContextProvider';

export default function SignupRegisterAccount({ nextStage, setUser }) {
  const openToast = useContext(ToastContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      email, password, confirmPassword,
    } = e.target;

    if (password !== confirmPassword) openToast('error', "Password's do not match");

    setUser({ email: email.value, password: password.value });
    nextStage(e);
  };

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
                <Link href="/" variant="body2">
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

SignupRegisterAccount.propTypes = {
  nextStage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
