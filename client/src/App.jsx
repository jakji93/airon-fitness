import {
  CssBaseline,
} from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import useNoProfileRedirect from './components/common/hooks/useNoProfileRedirect';
import useNoUserRedirect from './components/common/hooks/useNoUserRedirect';
import useRemoveSignup from './components/common/hooks/useRemoveSignup';
import ResponsiveAppBar from './components/Navbar';

export default function App() {
  useNoUserRedirect('/login');
  useNoProfileRedirect('/signup');
  useRemoveSignup();

  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}
