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
    fillHeight,
    required,
  } = props;

  return (
    <>
      { showTitleLabel && <GridInputLabel id={id} label={label} /> }
      <Grid item xs={12} sm={inputGridSizing(half, customTextFieldGridSize)} sx={fillHeight ? { height: '100%' } : ''}>
        <FormControl fullWidth size="small" sx={fillHeight ? { height: '100%' } : ''}>
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
            sx={fillHeight ? { height: '100%' } : ''}
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
  fillHeight: PropTypes.bool,
  required: PropTypes.bool,
};

FormSelect.defaultProps = {
  half: false,
  endAdornment: null,
  showTitleLabel: true,
  customTextFieldGridSize: 0,
  required: false,
  fillHeight: false,
};
