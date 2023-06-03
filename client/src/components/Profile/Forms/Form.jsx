import {
  Paper, Typography, Grid, Button,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import FormTextFieldInput from './FormTextFieldInput';
import FormSelect from './FormSelect';
import FormDatePicker from './FormDatePicker';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState(0);

  const clear = () => {
    setFirstName('');
    setLastName('');
    setBirthDate(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      'firstName:': firstName,
      'lastName:': lastName,
      'birthDate:': birthDate,
    });

    clear();
  };

  const genders = [
    'Female',
    'Male',
    'Non-binary',
    'Prefer not to say',
    'Other',
  ];

  return (

    <Paper elevation={3} sx={{ marginRight: '15%', marginLeft: '15%' }}>
      <Box sx={{ padding: 5 }}>
        <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
          Update Basic Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <FormTextFieldInput
              id="first-name"
              label="First Name"
              half
              value={firstName}
              setValue={setFirstName}
            />
            <FormTextFieldInput
              id="last-name"
              label="Last Name"
              half
              value={lastName}
              setValue={setLastName}
            />
            <FormDatePicker
              half
              id="birthdate"
              label="Born"
              setValue={setBirthDate}
              value={birthDate}
            />
            <FormSelect
              half
              id="gender"
              label="Gender"
              options={genders}
              setValue={setGender}
              value={gender}
            />
            <FormTextFieldInput
              id="weight"
              label="Weight"
              half
              value={weight}
              setValue={setWeight}
              type="number"
            />
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </form>
      </Box>
    </Paper>

  );
}
