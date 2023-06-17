/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Paper, Typography, Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

export const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

export default function Form(props) {
  const {
    handleSubmit,
    formTitle,
    children,
  } = props;

  return (
    <Paper elevation={3} sx={{ marginRight: '15%', marginLeft: '15%' }}>
      <Box sx={{ padding: 5 }}>
        <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
          {formTitle}
        </Typography>
        <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </form>
      </Box>
    </Paper>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  formTitle: PropTypes.string.isRequired,
};
