import {
  Grid, Button, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSignup } from '../../reducers/Signup';
import Form from '../Profile/Forms/Form';
import FormTextFieldInput from '../Profile/Forms/FormTextFieldInput';

export default function SignupAPIKey() {
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const [apiKey, setApiKey] = useState(signup.user.apiKey ?? '');

  const handleSubmit = () => {
    dispatch(setSignup({
      user: {
        apiKey,
      },
      step: signup.step + 1,
    }));
  };

  const handleBack = () => dispatch(setSignup({ step: signup.step - 1 }));

  return (
    <Form
      handleSubmit={handleSubmit}
      formTitle="In order to create your fitness plan, we need an OpenAI API Key."
      containerSx={{ width: '80vw', maxWidth: '675px' }}
      centerTitle
    >
      <Grid
        item
        xs={12}
        sm={12}
      >
        <Typography variant="subtitle1">
          If you don&apos;t know your API Key, checkout <a href="https://www.maisieai.com/help/how-to-get-an-openai-api-key-for-chatgpt#:~:text=How%20do%20I%C2%A0get%20an%20OpenAI%C2%A0API%C2%A0Key%3F" target="_blank" rel="noreferrer">this tutorial.</a>
        </Typography>
      </Grid>
      <FormTextFieldInput
        id="api-key"
        label="API Key"
        value={apiKey}
        setValue={setApiKey}
        showTitleLabel={false}
        autoComplete="api-key"
        customTextFieldGridSize={12}
        required
      />
      <Grid
        item
        xs={12}
        sm={6}
      >
        <Button
          onClick={handleBack}
          variant="contained"
          fullWidth
        >
          Back
        </Button>
      </Grid>
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
