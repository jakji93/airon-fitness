/* eslint-disable react/jsx-props-no-spreading */
import CheckIcon from '@mui/icons-material/Check';
import {
  Autocomplete, Grid, MenuItem, TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

import { inputGridSizing } from './Form';
import GridInputLabel from './GridInputLabel';

export default function FormMultiSelect(props) {
  const {
    id,
    label,
    half,
    value, setValue, setFieldValue,
    options,
    showTitleLabel,
    customTextFieldGridSize,
    required,
    limitTags,
    onBlur, error, helperText, size,
  } = props;

  const theme = useTheme();

  return (
    <>
      { showTitleLabel && <GridInputLabel id={id} label={label} /> }
      <Grid item xs={12} sm={inputGridSizing(half, customTextFieldGridSize)}>
        <Autocomplete
          limitTags={limitTags}
          value={value}
          onChange={(e, newValue) => {
            if (setValue) setValue(newValue);
            if (setFieldValue) setFieldValue(id, newValue);
          }}
          sx={{ m: 1, width: '100%', margin: 0 }}
          multiple
          id="tags-standard"
          options={options}
          getOptionLabel={(option) => option}
          disableCloseOnSelect
          size={size}
          renderOption={(menuItemProps, option, { selected }) => (
            <MenuItem
              {...menuItemProps}
              key={option}
              value={option}
              sx={{ justifyContent: 'space-between' }}
            >
              {option}
              {selected ? <CheckIcon color="info" /> : null}
            </MenuItem>
          )}
          renderInput={(params) => {
            if (required) {
              return (
                <TextField
                  {...params}
                  variant="filled"
                  label={label}
                  placeholder={label}
                  inputProps={{
                    ...params.inputProps,
                    required: value.length === 0,
                  }}
                  required={required}
                  error={error}
                  helperText={helperText}
                  onBlur={onBlur}
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                  }}
                />
              );
            }

            return (
              <TextField
                {...params}
                variant="filled"
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

FormMultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  half: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  setValue: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  showTitleLabel: PropTypes.bool,
  customTextFieldGridSize: PropTypes.number,
  required: PropTypes.bool,
  limitTags: PropTypes.number,
  setFieldValue: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  size: PropTypes.string,
};

FormMultiSelect.defaultProps = {
  half: false,
  showTitleLabel: true,
  customTextFieldGridSize: 0,
  required: false,
  limitTags: 20,
  setValue: null,
  setFieldValue: null,
  onBlur: null,
  error: false,
  helperText: '',
  size: 'small',
};
