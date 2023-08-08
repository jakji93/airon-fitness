import {
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

import FormTextFieldInput from './FormTextFieldInput';

export default function FormTextFieldWithRadio(props) {
  const {
    id, radioId,
    label,
    showTitleLabel,
    value, setValue, onChange,
    type,
    radioGroups,
    radioSelection, setRadioSelection, onChangeRadio,
    radioLabel,
    half,
    required,
    placeholder,
    onBlur,
    error,
    helperText,
    size,
  } = props;

  const theme = useTheme();

  return (
    <>
      <FormTextFieldInput
        id={id}
        label={label}
        showTitleLabel={showTitleLabel}
        half
        value={value}
        setValue={setValue}
        type={type}
        endAdornment={radioSelection}
        customTextFieldGridSize={half ? 3 : 0}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
        error={error}
        size={size}
        helperText={helperText}
      />
      <Grid item xs={12} sm={half ? 3 : 6}>
        <FormControl>
          {radioLabel
            && <FormLabel id={`${id}-row-radio-buttons-group-label`}>{radioLabel}</FormLabel>}
          <RadioGroup
            id={radioId}
            row
            name={radioId}
            aria-labelledby={`${radioId}-row-radio-buttons-group-label`}
            value={radioSelection}
            onChange={(e) => {
              if (setRadioSelection) setRadioSelection(e.target.value);
              if (onChangeRadio) onChangeRadio(e);
            }}
            sx={{
              color: theme.palette.secondary.light,
            }}
          >
            {radioGroups.map((val) => (
              <FormControlLabel
                value={val}
                control={
                  (
                    <Radio
                      sx={{
                        '&, &.Mui-checked': {
                          color: theme.palette.secondary.light,
                        },
                      }}
                    />
                  )
                }
                label={val}
                key={val}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
}

FormTextFieldWithRadio.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showTitleLabel: PropTypes.bool,
  radioLabel: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.oneOf([null]),
  ]),
  setValue: PropTypes.func,
  type: PropTypes.string,
  radioGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  half: PropTypes.bool,
  radioSelection: PropTypes.string.isRequired,
  setRadioSelection: PropTypes.func,
  required: PropTypes.bool,
  radioId: PropTypes.string,
  onChange: PropTypes.func,
  onChangeRadio: PropTypes.func,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  size: PropTypes.string,
};

FormTextFieldWithRadio.defaultProps = {
  type: 'number',
  showTitleLabel: true,
  radioLabel: null,
  value: null,
  half: false,
  required: false,
  setValue: null,
  setRadioSelection: null,
  radioId: '',
  onChange: null,
  onChangeRadio: null,
  placeholder: '',
  onBlur: null,
  error: false,
  helperText: '',
  size: 'small',
};
