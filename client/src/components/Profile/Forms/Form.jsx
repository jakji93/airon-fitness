/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Typography, Grid, Container } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';

export const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
};

export const inputLabelSizing = 2.5;
export const inputGridSizing = (half, custom = 0) => {
  if (custom) return custom;
  return half ? 3.5 : 9.5;
};

export default function Form(props) {
  const {
    handleSubmit,
    formTitle,
    children,
    containerSx,
    centerTitle,
  } = props;

  const centerStyle = centerTitle ? {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  } : {};

  return (
    <Container sx={containerSx} maxWidth={false}>
      <Box sx={{ padding: 5, ...centerStyle }}>
        {formTitle && <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}> {formTitle}</Typography>}
        <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  formTitle: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  containerSx: PropTypes.object,
  centerTitle: PropTypes.bool,
};

Form.defaultProps = {
  formTitle: '',
  containerSx: {},
  centerTitle: false,
};
