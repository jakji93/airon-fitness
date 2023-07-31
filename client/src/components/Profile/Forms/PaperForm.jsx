/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Paper, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

export const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

export const inputLabelSizing = 2.5;
export const inputGridSizing = (half) => (half ? 3.5 : 9.5);

export default function PaperForm(props) {
  const {
    handleSubmit,
    formTitle,
    children,
  } = props;

  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ marginRight: '15%', marginLeft: '15%' }}>
      <Box sx={{ padding: 5 }}>
        {formTitle && <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5, color: theme.palette.secondary.light }}> {formTitle}</Typography>}
        <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
          <Grid
            container
            spacing={3}
          >
            {children}
          </Grid>
        </form>
      </Box>
    </Paper>
  );
}

PaperForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  formTitle: PropTypes.string,
};

PaperForm.defaultProps = {
  formTitle: '',
};
