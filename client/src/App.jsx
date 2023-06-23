import {
  CssBaseline, ThemeProvider,
} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Toast from './components/common/context/Toast';
import ResponsiveAppBar from './components/Navbar';
import theme from './theme';

const noAppBarRoutes = ['lib', 'signup'];

export default function App() {
  const location = window.location.href.split('/');
  const showAppBar = !noAppBarRoutes.includes(location[location.length - 1]);

  return (
    <Toast>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {showAppBar && <ResponsiveAppBar />}
        <Outlet />
      </ThemeProvider>
    </Toast>
  );
}
