import React from 'react';
import {
  Grid, InputLabel, FormControl, Select, MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function FormSelect(props) {
  const {
    id,
    label,
    half,
    value,
    setValue,
    options,
  } = props;

  return (
    <>
      <Grid item xs={12} sm={2}>
        <InputLabel
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 700,
          }}
        >
          {label}
        </InputLabel>
      </Grid>
      <Grid item xs={12} sm={half ? 4 : 10}>
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
  half: PropTypes.bool,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

FormSelect.defaultProps = {
  half: false,
};
