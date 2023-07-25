import {
  Grid, Button, Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { setSignup } from '../../reducers/Signup';
import Form from '../Profile/Forms/Form';
import FormTextFieldInput from '../Profile/Forms/FormTextFieldInput';

const validationSchema = yup.object({
  apiKey: yup
    .string('Select a gender')
    .required('api key is required'),
});

export default function SignupAPIKey() {
  const dispatch = useDispatch();
  const signup = useSelector((state) => state.signup);
  const initialValues = {
    apiKey: signup.user.apiKey ?? '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(setSignup({
        user: {
          apiKey: values.apiKey,
        },
        step: signup.step + 1,
      }));
    },
  });

  useEffect(() => {
    Object.entries(initialValues).forEach(([fieldName, value]) => {
      formik.setFieldValue(fieldName, value);
    });
  }, [signup]);

  const handleBack = () => {
    dispatch(setSignup({
      user: {
        apiKey: formik.values.apiKey,
      },
      step: signup.step - 1,
    }));
  };

  return (
    <Form
      handleSubmit={formik.handleSubmit}
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
        id="apiKey"
        label="API Key"
        showTitleLabel={false}
        autoComplete="apiKey"
        customTextFieldGridSize={12}
        required
        value={formik.values.apiKey}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.apiKey && Boolean(formik.errors.apiKey)}
        helperText={formik.touched.apiKey && formik.errors.apiKey}
        size="medium"
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
