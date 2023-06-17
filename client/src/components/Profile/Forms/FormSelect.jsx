import {
  Grid, InputLabel, FormControl, Select, MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function FormSelect(props) {
  const {
    id,
    label,
    showTitleLabel,
    half,
    value,
    setValue,
    options,
    limitWidth,
  } = props;

  return (
    <>
      {
          showTitleLabel
            ? (
              <Grid item xs={12} sm={2}>
                <InputLabel
                  id={`${id}-label`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 700,
                    wordWrap: 'break-word',
                    whiteSpace: 'normal',
                  }}
                >
                  {label}
                </InputLabel>
              </Grid>
            ) : ''
        }
      <Grid item xs={12} sm={half ? 4 : 10}>
        <FormControl fullWidth sx={limitWidth ? { m: 1, width: 500 } : {}}>
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
  showTitleLabel: PropTypes.bool,
  half: PropTypes.bool,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  limitWidth: PropTypes.bool,
};

FormSelect.defaultProps = {
  half: false,
  showTitleLabel: true,
  limitWidth: false,
};
