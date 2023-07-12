import {
  Grid, Button,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { genderOptions } from '../../constants/BasicProfile';
import { resetAuth } from '../../reducers/Auth';
import { setSignup } from '../../reducers/Signup';
import { ToastContext } from '../common/context/ToastContextProvider';
import Spinner from '../common/Spinner';
import Form from '../Profile/Forms/Form';
import FormDatePicker from '../Profile/Forms/FormDatePicker';
import FormSelect from '../Profile/Forms/FormSelect';
import FormTextFieldInput from '../Profile/Forms/FormTextFieldInput';

export default function SignupBasicUserDetails() {
  const {
    user, isLoading, isError, isSuccess, message,
  } = useSelector((state) => state.auth);
  const openToast = useContext(ToastContext);
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const [gender, setGender] = useState(signup.user.gender ?? '');
  const [firstName, setFirstName] = useState(signup.user.firstName ?? '');
  const [lastName, setLastName] = useState(signup.user.lastName ?? '');
  const [birthday, setBirthday] = useState(dayjs(signup.user.birthday) ?? null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (birthday.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')) {
      openToast('error', 'Please add your birthday', 3000);
      return;
    }

    dispatch(setSignup({
      user: {
        gender,
        firstName,
        lastName,
        birthday: birthday.format('YYYY-MM-DD'),
      },
      step: signup.step + 1,
    }));
  };
  useEffect(() => {
    if (isError) {
      openToast('error', message);
    }

    if (isSuccess || user) {
      openToast('success', 'Your account has been created!');
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
        id="first-name"
        label="First Name"
        value={firstName}
        setValue={setFirstName}
        showTitleLabel={false}
        autoComplete="given-name"
        customTextFieldGridSize={6}
        required
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
        required
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
      <FormDatePicker
        half
        id="birthdate"
        label="Born"
        setValue={setBirthday}
        value={birthday}
        showTitleLabel={false}
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
          Next
        </Button>
      </Grid>
    </Form>
  );
}
