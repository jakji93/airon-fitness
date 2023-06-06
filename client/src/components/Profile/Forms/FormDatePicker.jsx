import { Grid, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React from 'react';

export default function FormDatePicker(props) {
  const {
    id,
    label,
    half,
    value,
    setValue,
  } = props;

  return (
    <>
      <Grid item xs={12} sm={2}>
        <InputLabel
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 700,
            wordWrap: 'break-word',
            whiteSpace: 'normal',
          }}
          id={`${id}-label`}
        >
          {label}
        </InputLabel>
      </Grid>
      <Grid item xs={12} sm={half ? 4 : 10}>
        <DatePicker value={value} onChange={(val) => setValue(val)} />
      </Grid>
    </>
  );
}

const dayjsValidator = (props, propName, componentName, location, propFullName) => {
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
  setValue: PropTypes.func.isRequired,
};

FormDatePicker.defaultProps = {
  half: false,
  value: null,
};
