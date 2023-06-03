import React from 'react';
import { Typography } from '@mui/material';
import AvatarUpload from '../components/Profile/AvatarUpload';

export default function Profile() {
  return (
    <>
      <Typography variant="h1">
        Profile Page
      </Typography>
      <AvatarUpload />
    </>
  );
}
