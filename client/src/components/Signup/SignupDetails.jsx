import {
  Box, Typography, Grid, TextField, Button, Select, MenuItem,
} from '@mui/material';
import * as React from 'react';

export default function SignupDetails() {
  const handleSubmit = () => {

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
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
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
