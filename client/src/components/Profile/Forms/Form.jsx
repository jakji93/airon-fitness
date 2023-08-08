/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Typography, Grid, Container } from '@mui/material';
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
export const inputGridSizing = (half, custom = 0) => {
  if (custom !== 0) return custom;
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

  const theme = useTheme();

  return (
    <Container sx={containerSx} maxWidth={false}>
      <Box sx={{ padding: 5, ...centerStyle }}>
        {formTitle && <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5, color: theme.palette.secondary.light }}> {formTitle}</Typography>}
        <form onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
          <Grid container spacing={3} xs={12}>
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
