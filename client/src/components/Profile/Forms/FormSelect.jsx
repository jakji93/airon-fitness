import {
  Grid, InputLabel, Container, FormControl, Select, MenuItem,
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
    options,
    limitWidth,
    flexbox,
  } = props;

  return (
    <Container sx={flexbox ? {
      display: 'flex',
      alignItems: 'center',
    } : { display: 'contents' }}
    >
      {
          showTitleLabel
            ? (
              <GridInputLabel
                id={id}
                label={label}
              />
            ) : ''
        }
      <Grid item xs={12} sm={inputGridSizing(half)}>
        <FormControl fullWidth size={limitWidth ? '' : 'small'} sx={limitWidth ? { m: 1, width: 500 } : {}}>
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
    </Container>
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
  flexbox: PropTypes.bool,
};

FormSelect.defaultProps = {
  half: false,
  showTitleLabel: true,
  limitWidth: false,
  flexbox: false,
};
