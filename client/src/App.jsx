import {
  CssBaseline,
} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import useNoUserRedirect from './components/common/hooks/useNoUserRedirect';
import ResponsiveAppBar from './components/Navbar';

export default function App() {
  useNoUserRedirect('/login');

  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}
