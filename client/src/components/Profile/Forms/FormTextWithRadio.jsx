import {
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import FormTextFieldInput from './FormTextFieldInput';

export default function FormTextFieldWithRadio(props) {
  const {
    id,
    label,
    showTitleLabel,
    value,
    setValue,
    type,
    radioGroups,
    // Array of functions that convert from each option in radioGroups,
    // to the measurement unit of the first
    // First value in array should be noop
    conversionFunctions,
    radioLabel,
  } = props;
  const [radioSelection, setRadioSelection] = useState(radioGroups[0]);
  const [inputValue, setInputValue] = useState(value);

  /**
   * Convert measurements to the first one specified in radioGroups
   * If selection is already the first, simply set the value
   */
  const setConvertedValue = (val) => {
    if (radioSelection === radioGroups[0]) {
      setValue(val);
      return;
    }
    const index = radioGroups.findIndex((item) => item === radioSelection);
    const conversionFunction = conversionFunctions[index];
    const convertedValue = conversionFunction(val);
    setValue(convertedValue);
  };

  useEffect(() => {
    setConvertedValue(inputValue);
  }, [inputValue, radioSelection]);

  return (
    <>
      <FormTextFieldInput
        id={id}
        label={label}
        showTitleLabel={showTitleLabel}
        half
        value={inputValue}
        setValue={setInputValue}
        type={type}
        endAdornment={radioSelection}
      />
      <Grid item xs={12} sm={6}>
        <FormControl>
          {radioLabel
            && <FormLabel id={`${id}-row-radio-buttons-group-label`}>{radioLabel}</FormLabel>}
          <RadioGroup
            row
            name={`${id}row-radio-buttons-group`}
            aria-labelledby={`${id}-row-radio-buttons-group-label`}
            value={radioSelection}
            onChange={(e) => setRadioSelection(e.target.value)}
          >
            {radioGroups.map((val) => (
              <FormControlLabel
                value={val}
                control={<Radio />}
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
  ]),
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  radioGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
  conversionFunctions: PropTypes.arrayOf(PropTypes.func).isRequired,
};

FormTextFieldWithRadio.defaultProps = {
  type: 'number',
  showTitleLabel: true,
  radioLabel: null,
  value: 0,
};
