/* eslint-disable react/jsx-props-no-spreading */
import {
  Autocomplete, Chip, Container, Grid, TextField,
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
  } = props;

  return (
    <Container sx={{
      display: 'flex',
      alignItems: 'center',
    }}
    >
      <GridInputLabel
        id={id}
        label={label}
      />
      <Grid item xs={12} sm={inputGridSizing(half)}>
        <Autocomplete
          multiple
          id="tags-filled"
          value={value}
          options={[]}
          freeSolo
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ m: 1, width: '100%' }}
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
            />
          )}
        />
      </Grid>
    </Container>
  );
}

FormMultiInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  half: PropTypes.bool,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  setValue: PropTypes.func.isRequired,
};

FormMultiInput.defaultProps = {
  half: false,
};
