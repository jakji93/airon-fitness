import {
  Grid, TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';

import { inputGridSizing } from './Form';
import GridInputLabel from './GridInputLabel';

function FilledTextField(props) {
  return (
    <TextField
      variant="filled"
      {...props}
    />
  );
}

export default function FormDatePicker(props) {
  const {
    id,
    label,
    half,
    customTextFieldGridSize,
    showTitleLabel,
    name,
    disableFuture,
    setFieldValue,
    value,
    setValue,
  } = props;

  const theme = useTheme();

  return (
    <>
      {showTitleLabel && (
        <GridInputLabel
          id={`${id}-label`}
          label={label}
        />
      )}
      <Grid item xs={12} sm={inputGridSizing(half, customTextFieldGridSize)}>
        <DatePicker
          label={label}
          id={id}
          value={value ?? null}
          onChange={(val) => {
            if (setFieldValue) setFieldValue(name, val);
            if (setValue) setValue(val);
          }}
          disableFuture={disableFuture}
          sx={{
            width: '100%',
            backgroundColor: theme.palette.secondary.light,
          }}
          slots={{
            textField: FilledTextField,
          }}
        />
      </Grid>
    </>
  );
}

export const dayjsValidator = (props, propName, componentName, location, propFullName) => {
  let error;
  const propValue = props[propName];
  // Check if propValue is a valid Day.js object
  if (!dayjs.isDayjs(propValue) && propValue !== null) {
    error = new Error(
      `Invalid ${location} '${propFullName}' supplied to '${componentName}'.
      Expected a Day.js object.`,
    );
  }
  return error;
};

FormDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  half: PropTypes.bool,
  value: dayjsValidator,
  setFieldValue: PropTypes.func,
  customTextFieldGridSize: PropTypes.number,
  showTitleLabel: PropTypes.bool,
  name: PropTypes.string.isRequired,
  disableFuture: PropTypes.bool,
  setValue: PropTypes.func,
};

FormDatePicker.defaultProps = {
  half: false,
  value: null,
  customTextFieldGridSize: 0,
  showTitleLabel: false,
  disableFuture: false,
  setValue: null,
  setFieldValue: null,
};
