import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContext } from '../components/common/context/ToastContextProvider';
import RelativeSpinner from '../components/common/RelativeSpinner';
import TabPanel from '../components/common/TabPanel';
import AdditionalProfileForm from '../components/Profile/AdditionalProfileForm';
import AvatarUpload from '../components/Profile/AvatarUpload';
import BasicProfileForm from '../components/Profile/BasicProfileForm';
import ScheduleHistory from '../components/Profile/ScheduleHistory/ScheduleHistory';
import { resetUserProfileStates } from '../reducers/UserProfile';

export default function Profile() {
  const openToast = useContext(ToastContext);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [value, setValue] = useState(0);
  const {
    profile, isLoading, isError, isSuccess, message,
  } = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && updatingProfile) {
      openToast('success', 'Your profile has been updated!');
      setUpdatingProfile(false);
      dispatch(resetUserProfileStates());
    }

    if (isError) {
      openToast('error', message);
      dispatch(resetUserProfileStates());
      setUpdatingProfile(false);
    }
  }, [profile, isError, isSuccess, message, dispatch]);

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: '100%',
      zIndex: 0,
    }}
    >
      {isLoading && <RelativeSpinner />}
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      <AvatarUpload />
      <div style={{ marginTop: '2rem', marginBottom: '2rem' }} />
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="icon label tabs example"
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab
          label="Basic Profile"
          sx={{ width: '100%', color: 'white' }}
        />
        <Tab
          label="Additional Profile"
          sx={{ width: '100%', color: 'white' }}
        />
        <Tab
          label="Schedule History"
          sx={{ width: '100%' }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <BasicProfileForm setUpdatingProfile={setUpdatingProfile} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AdditionalProfileForm setUpdatingProfile={setUpdatingProfile} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ScheduleHistory setUpdatingProfile={setUpdatingProfile} />
      </TabPanel>
    </Box>
  );
}
