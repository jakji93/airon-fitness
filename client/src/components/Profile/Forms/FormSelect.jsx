import {
  Grid, InputLabel, FormControl, Select, MenuItem, InputAdornment,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { inputGridSizing } from './Form';
import GridInputLabel from './GridInputLabel';

export default function FormSelect(props) {
  const {
    id,
    label,
    showTitleLabel,
    half,
    value,
    setValue,
    options,
    endAdornment,
    customTextFieldGridSize,
    required,
  } = props;

  console.log(value);

  return (
    <>
      { showTitleLabel && <GridInputLabel id={id} label={label} /> }
      <Grid item xs={12} sm={inputGridSizing(half, customTextFieldGridSize)}>
        <FormControl fullWidth size="small">
          <InputLabel
            id={`${id}-label`}
            sx={{
              wordWrap: 'break-word',
              whiteSpace: 'normal',
            }}
          >
            {label}
          </InputLabel>
          <Select
            labelId={`${id}-label`}
            id={`${id}-select`}
            value={value}
            label={label}
            onChange={(e) => setValue(e.target.value)}
            endAdornment={(
              <InputAdornment
                sx={{
                  marginRight: '10px',
                }}
                position="end"
              >
                {endAdornment}
              </InputAdornment>
            )}
            required={required}
          >
            {options.map((val) => (
              <MenuItem value={val} key={val}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  );
}

FormSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showTitleLabel: PropTypes.bool,
  half: PropTypes.bool,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  endAdornment: PropTypes.string,
  customTextFieldGridSize: PropTypes.number,
  required: PropTypes.bool,
};

FormSelect.defaultProps = {
  half: false,
  endAdornment: null,
  showTitleLabel: true,
  customTextFieldGridSize: 0,
  required: false,
};
