import {
  Grid, InputAdornment, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { inputGridSizing } from './Form';
import GridInputLabel from './GridInputLabel';

export default function FormTextFieldInput(props) {
  const {
    id,
    label,
    half,
    value,
    setValue,
    type,
    multiline,
    endAdornment,
  } = props;

  return (
    <>
      <GridInputLabel
        id={id}
        label={label}
      />
      <Grid item xs={12} sm={inputGridSizing(half)}>
        <TextField
          required
          id={id}
          name={id}
          label={label}
          fullWidth
          size="small"
          autoComplete="off"
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          multiline={multiline}
          InputProps={{
            endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
          }}
        />
      </Grid>
    </>
  );
}

FormTextFieldInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  half: PropTypes.bool,
  multiline: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  endAdornment: PropTypes.string,
};

FormTextFieldInput.defaultProps = {
  half: false,
  multiline: false,
  type: null,
  endAdornment: null,
};
