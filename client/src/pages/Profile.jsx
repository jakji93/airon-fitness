import { Typography } from '@mui/material';
import React from 'react';

import AdditionalProfileForm from '../components/Profile/AdditionalProfileForm';
import AvatarUpload from '../components/Profile/AvatarUpload';
import BasicProfileForm from '../components/Profile/BasicProfileFormForm';

export default function Profile() {
  return (
    <>
      <Typography variant="h1">
        Profile Page
      </Typography>
      <AvatarUpload />
      <BasicProfileForm />
      <AdditionalProfileForm />
    </>
  );
}
