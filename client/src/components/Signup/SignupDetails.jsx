import {
  Box, Typography, Grid, TextField, Button,
} from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { genders } from '../../utils/userUtils';
import FormSelect from '../Profile/Forms/FormSelect';

export default function SignupDetails({ nextStage, updateUser }) {
  const [gender, setGender] = useState('');
  const handleSubmit = (e) => {
    updateUser({});
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
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
              options={genders}
              setValue={setGender}
              value={gender}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}

SignupDetails.propTypes = {
  nextStage: PropTypes.func,
  updateUser: PropTypes.func,
};

SignupDetails.defaultProps = {
  nextStage: null,
  updateUser: null,
};
