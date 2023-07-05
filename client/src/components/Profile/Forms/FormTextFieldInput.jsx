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
    showTitleLabel,
    half,
    value,
    setValue,
    type,
    multiline,
    endAdornment,
    customTextFieldGridSize,
    autoComplete,
    required,
  } = props;

  return (
    <>
      { showTitleLabel && <GridInputLabel id={id} label={label} /> }
      <Grid
        item
        xs={12}
        sm={inputGridSizing(half, customTextFieldGridSize)}
      >
        <TextField
          required={required}
          id={id}
          name={id}
          label={label}
          fullWidth
          size="small"
          variant="outlined"
          value={value ?? ''}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          multiline={multiline}
          InputProps={{
            endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
          }}
          autoComplete={autoComplete}
        />
      </Grid>
    </>
  );
}

FormTextFieldInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showTitleLabel: PropTypes.bool,
  half: PropTypes.bool,
  multiline: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  endAdornment: PropTypes.string,
  customTextFieldGridSize: PropTypes.number,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
};

FormTextFieldInput.defaultProps = {
  half: false,
  multiline: false,
  showTitleLabel: true,
  type: null,
  endAdornment: null,
  customTextFieldGridSize: 0,
  autoComplete: 'off',
  required: false,
  value: null,
};
