import {
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import FormTextFieldInput from './FormTextFieldInput';

export default function FormTextFieldWithRadio(props) {
  const {
    id,
    label,
    value,
    setValue,
    type,
    radioGroups,
    radioLabel,
  } = props;
  const [selectedValue, setSelectedValue] = useState(radioGroups[0]);

  return (
    <>
      <FormTextFieldInput
        id={id}
        label={label}
        half
        value={value}
        setValue={setValue}
        type={type}
        endAdornment={selectedValue}
      />
      <Grid item xs={12} sm={6}>
        <FormControl>
          {radioLabel
            && <FormLabel id={`${id}-row-radio-buttons-group-label`}>{radioLabel}</FormLabel>}
          <RadioGroup
            row
            name={`${id}row-radio-buttons-group`}
            aria-labelledby={`${id}-row-radio-buttons-group-label`}
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
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
  radioLabel: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  radioGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

FormTextFieldWithRadio.defaultProps = {
  type: 'number',
  radioLabel: null,
};
