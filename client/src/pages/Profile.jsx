import { Typography } from '@mui/material';
import React from 'react';

import AvatarUpload from '../components/Profile/AvatarUpload';
import BasicInfoForm from '../components/Profile/Forms/BasicInfoForm';

export default function Profile() {
  return (
    <>
      <Typography variant="h1">
        Profile Page
      </Typography>
      <AvatarUpload />
      <BasicInfoForm />
    </>
  );
}
