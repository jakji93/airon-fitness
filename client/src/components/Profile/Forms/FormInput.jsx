import React from 'react';
import { Grid, InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';

export default function FormInput(props) {
  const {
    id,
    label,
    half,
  } = props;
  return (
    <>
      <Grid item xs={12} sm={2}>
        <InputLabel
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
      <Grid item xs={12} sm={half ? 4 : 10}>
        <TextField
          required
          id={id}
          name={id}
          label={label}
          fullWidth
          size="small"
          autoComplete="off"
          variant="outlined"
        />
      </Grid>
    </>
  );
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  half: PropTypes.bool,
};

FormInput.defaultProps = {
  half: false,
};
