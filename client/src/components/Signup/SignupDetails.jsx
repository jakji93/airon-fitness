import {
  Grid, Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { genderOptions } from '../../constants/BasicProfile';
import Form from '../Profile/Forms/Form';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldInput from '../Profile/Forms/FormTextFieldInput';

export default function SignupDetails(props) {
  const {
    nextStage,
    gender, setGender,
    firstName, setFirstName,
    lastName, setLastName,
  } = props;
  const handleSubmit = (e) => {
    nextStage(e);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="Welcome to Ai-ron Fitness! Let&apos;s get a profile tailored for you."
      containerSx={{ width: '80vw', maxWidth: '675px' }}
      centerTitle
    >
      <FormTextFieldInput
        half
        id="first-name"
        label="First Name"
        value={firstName}
        setValue={setFirstName}
        showTitleLabel={false}
        autoComplete="given-name"
        customTextFieldGridSize={6}
      />
      <FormTextFieldInput
        half
        id="last-name"
        label="Last Name"
        value={lastName}
        setValue={setLastName}
        showTitleLabel={false}
        autoComplete="family-name"
        customTextFieldGridSize={6}
      />
      <FormSelect
        id="gender"
        label="Gender *"
        showTitleLabel={false}
        options={genderOptions}
        setValue={setGender}
        value={gender}
        required
        customTextFieldGridSize={6}
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
          Continue
        </Button>
      </Grid>
    </Form>
  );
}

SignupDetails.propTypes = {
  nextStage: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  setFirstName: PropTypes.func.isRequired,
  lastName: PropTypes.string.isRequired,
  setLastName: PropTypes.func.isRequired,
};
