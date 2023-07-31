/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete, Chip, Grid, TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

import { inputGridSizing } from './Form';
import GridInputLabel from './GridInputLabel';

export default function FormMultiInput(props) {
  const {
    id,
    label,
    half,
    value, setValue, setFieldValue,
    showTitleLabel,
    customTextFieldGridSize,
    required,
    size,
    placeholder,
  } = props;

  const theme = useTheme();

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
          onChange={(e, newValue) => {
            if (setValue) setValue(newValue);
            if (setFieldValue) setFieldValue(id, newValue);
          }}
          placeholder={placeholder}
          sx={{ width: '100%' }}
          getOptionLabel={(option) => option}
          size={size}
          renderTags={(val, getTagProps) => val.map((option, index) => (
            <Chip
              variant="filled"
              label={option}
              {...getTagProps({ index })}
            />
          ))}
          renderInput={(params) => {
            if (required) {
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  label={label}
                  inputProps={{
                    ...params.inputProps,
                    required: value.length === 0,
                  }}
                  required={required}
                  placeholder={placeholder}
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                  }}
                />
              );
            }
            return (
              <TextField
                {...params}
                variant="outlined"
                label={label}
                placeholder={label}
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                }}
              />
            );
          }}
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
  setValue: PropTypes.func,
  showTitleLabel: PropTypes.bool,
  customTextFieldGridSize: PropTypes.number,
  required: PropTypes.bool,
  setFieldValue: PropTypes.func,
  size: PropTypes.string,
  placeholder: PropTypes.string,
};

FormMultiInput.defaultProps = {
  half: false,
  showTitleLabel: true,
  customTextFieldGridSize: 0,
  required: false,
  setFieldValue: null,
  setValue: null,
  size: 'small',
  placeholder: '',
};
