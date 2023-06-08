import {
  Typography, Box, Alert, Button,
} from '@mui/material';
import React from 'react';

import { StyledButton } from '../styled';
import theme from '../theme';

export default function DesignLibrary() {
  return (
    <Box>
      <Typography variant="h1" color={theme.palette.primary.dark} sx={{ fontFamily: ['lato'] }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. (Lato)</Typography>
      <Typography variant="h1" color={theme.palette.primary.dark} sx={{ fontFamily: ['montserrat'] }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. (Montserrat)</Typography>
      <Typography variant="h1" color={theme.palette.primary.dark} sx={{ fontFamily: ['roboto'] }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. (Roboto)</Typography>
      <Typography variant="h1" color={theme.palette.primary.dark}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. (Sans-Serif)</Typography>
      <Typography variant="h1" color={theme.palette.primary.dark}>This is a h1</Typography>
      <Typography variant="h2">This is a h2</Typography>
      <Typography variant="h3">This is a h3</Typography>
      <Typography variant="h4">This is a h4</Typography>
      <Typography variant="h5">This is a h5</Typography>
      <StyledButton>Button</StyledButton>
      <Button color="success">Button</Button>
      <Alert severity="error">This is an error alert — check it out!</Alert>
      <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert>
    </Box>
  );
}
