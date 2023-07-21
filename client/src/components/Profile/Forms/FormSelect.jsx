import {
  Grid, InputLabel, FormControl, Select, MenuItem, InputAdornment, FormHelperText,
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
    onChange,
    options,
    endAdornment,
    customTextFieldGridSize,
    fillHeight,
    required,
    placeholder,
    onBlur,
    error,
    helperText,
    size,
  } = props;

  return (
    <>
      { showTitleLabel && <GridInputLabel id={id} label={label} /> }
      <Grid item xs={12} sm={inputGridSizing(half, customTextFieldGridSize)} sx={fillHeight ? { height: '100%' } : ''}>
        <FormControl fullWidth size={size} sx={fillHeight ? { height: '100%' } : ''}>
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
            id={id}
            name={id}
            value={value}
            label={label}
            onChange={(e) => {
              if (setValue) setValue(e.target.value);
              if (onChange) onChange(e);
            }}
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
            placeholder={placeholder}
            onBlur={onBlur}
            error={error}
          >
            {options.map((val) => (
              <MenuItem value={val} key={val}>{val}</MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
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
  setValue: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  endAdornment: PropTypes.string,
  customTextFieldGridSize: PropTypes.number,
  fillHeight: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  size: PropTypes.string,
};

FormSelect.defaultProps = {
  half: false,
  endAdornment: null,
  showTitleLabel: true,
  customTextFieldGridSize: 0,
  required: false,
  fillHeight: false,
  placeholder: '',
  onBlur: null,
  onChange: null,
  setValue: null,
  error: false,
  helperText: '',
  size: 'small',
};
