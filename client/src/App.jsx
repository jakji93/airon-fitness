import {
  CssBaseline, ThemeProvider,
} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import ResponsiveAppBar from './components/Navbar';
import theme from './theme';

export default function App() {
  const location = window.location.href.split('/');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      { location[location.length - 1] !== 'lib' && location[location.length - 1] !== 'signup' ? <ResponsiveAppBar /> : ''}
      <Outlet />
    </ThemeProvider>
  );
}
