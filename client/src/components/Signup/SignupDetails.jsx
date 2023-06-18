import {
  Box, Typography, Grid, TextField, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { genderOptions } from '../../constants/BasicProfile';
import FormSelect from '../Profile/Forms/FormSelect';

export default function SignupDetails({ nextStage, setUser }) {
  const [userGender, setUserGender] = useState('');
  const handleSubmit = (e) => {
    const { firstName, lastName } = e.target;

    setUser((prevState) => ({
      ...prevState, firstName: firstName.value, lastName: lastName.value, gender: userGender,
    }));
    nextStage(e);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Welcome to AI-ron Fitness!
      </Typography>
      <Typography component="h3" variant="h5">
        Let&apos;s get a profile tailored for you
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
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <FormSelect
              half
              id="gender"
              label="Gender"
              showTitleLabel={false}
              options={genderOptions}
              setValue={setUserGender}
              value={userGender}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, width: '300px' }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}

SignupDetails.propTypes = {
  nextStage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
