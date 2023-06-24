import {
  CssBaseline,
} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import ResponsiveAppBar from './components/Navbar';

export default function App() {
  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}
