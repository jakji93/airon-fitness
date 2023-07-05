/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete, Chip, Grid, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { inputGridSizing } from './Form';
import GridInputLabel from './GridInputLabel';

export default function FormMultiInput(props) {
  const {
    id,
    label,
    half,
    value,
    setValue,
    showTitleLabel,
    customTextFieldGridSize,
    required,
  } = props;

  return (
    <>
      {showTitleLabel && (
        <GridInputLabel
          id={id}
          label={label}
        />
      )}
      <Grid item xs={12} sm={inputGridSizing(half, customTextFieldGridSize)}>
        <Autocomplete
          multiple
          id="tags-filled"
          value={value}
          options={[]}
          freeSolo
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ width: '100%' }}
          getOptionLabel={(option) => option}
          renderTags={(val, getTagProps) => val.map((option, index) => (
            <Chip
              variant="filled"
              label={option}
              {...getTagProps({ index })}
            />
          ))}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={label}
              placeholder={label}
              inputProps={{
                ...params.inputProps,
                autoComplete: required && 'new-password',
                required: !required || value.length === 0,
              }}
              required={required}
            />
          )}
        />
      </Grid>
    </>
  );
}

FormMultiInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  half: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  setValue: PropTypes.func.isRequired,
  showTitleLabel: PropTypes.bool,
  customTextFieldGridSize: PropTypes.number,
  required: PropTypes.bool,
};

FormMultiInput.defaultProps = {
  half: false,
  showTitleLabel: true,
  customTextFieldGridSize: 0,
  required: false,
};
