import { Typography } from '@mui/material';
import React from 'react';

import AvatarUpload from '../components/Profile/AvatarUpload';
import Form from '../components/Profile/Forms/Form';

export default function Profile() {
  return (
    <>
      <Typography variant="h1">
        Profile Page
      </Typography>
      <AvatarUpload />
      <Form />
    </>
  );
}
