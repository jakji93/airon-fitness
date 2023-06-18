import { Grid, InputLabel } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { inputLabelSizing } from './Form';

export default function GridInputLabel(props) {
  const {
    id,
    label,
  } = props;

  return (
    <Grid item xs={12} sm={inputLabelSizing}>
      <InputLabel
        id={`${id}-label`}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontWeight: 700,
          wordWrap: 'break-word',
          whiteSpace: 'normal',
        }}
        htmlFor={id}
      >
        {label}
      </InputLabel>
    </Grid>
  );
}

GridInputLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
