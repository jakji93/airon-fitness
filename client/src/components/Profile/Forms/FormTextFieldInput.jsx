import {
  Grid, InputAdornment, TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { inputGridSizing } from './Form';
import GridInputLabel from './GridInputLabel';
import theme from '../../../theme';

export const underlineStyle = {
  backgroundColor: theme.palette.secondary.light,
  '& .MuiFilledInput-underline:before': {
    borderBottomColor: theme.palette.secondary.main,
  },
  '& .MuiFilledInput-underline:hover': {
    borderBottomColor: theme.palette.secondary.main,
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: theme.palette.secondary.main,
  },
};

export default function FormTextFieldInput(props) {
  const {
    id,
    label,
    showTitleLabel,
    half,
    value,
    setValue,
    onChange,
    type,
    multiline,
    endAdornment,
    customTextFieldGridSize,
    autoComplete,
    required,
    placeholder,
    onBlur,
    error,
    helperText,
    size,
  } = props;
  const ariaLabel = endAdornment ? `${label} with units ${endAdornment}` : label;

  return (
    <>
      { showTitleLabel && <GridInputLabel id={id} label={label} /> }
      <Grid
        item
        xs={12}
        sm={inputGridSizing(half, customTextFieldGridSize)}
        aria-label={ariaLabel}
      >
        <TextField
          required={required}
          id={id}
          name={id}
          label={label}
          fullWidth
          size={size}
          variant="filled"
          value={value}
          onChange={(e) => {
            if (setValue) setValue(e.target.value);
            if (onChange) onChange(e);
          }}
          type={type}
          multiline={multiline}
          InputProps={{
            endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
          }}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          sx={{
            backgroundColor: theme.palette.secondary.light,
            ...underlineStyle,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          inputProps={{ 'aria-label': ariaLabel }}
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
  setValue: PropTypes.func,
  type: PropTypes.string,
  endAdornment: PropTypes.string,
  customTextFieldGridSize: PropTypes.number,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  size: PropTypes.string,
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
  placeholder: '',
  error: false,
  onBlur: null,
  onChange: null,
  setValue: null,
  helperText: '',
  size: 'small',
};
