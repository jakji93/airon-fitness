import {
  CssBaseline,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import useNoUserRedirect from './components/common/hooks/useNoUserRedirect';
import ResponsiveAppBar from './components/Navbar';
import { getUserProfile, resetUserProfileStates } from './reducers/UserProfile';

export default function App() {
  useNoUserRedirect('/login');
  const dispatch = useDispatch();
  const {
    profile, isSuccess,
  } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (!profile) dispatch(getUserProfile());
    if (isSuccess || profile) {
      dispatch(resetUserProfileStates());
    }
  }, [profile, isSuccess, dispatch]);

  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <Outlet />
    </>
  );
}
