import {
  CssBaseline,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import ResponsiveAppBar from './components/Navbar';

export default function App() {
  const {
    user,
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}
