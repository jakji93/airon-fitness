import { Grid, Pagination, Box } from '@mui/material';
import React, { useEffect, useState, useReducer } from 'react';

import ScheduleItem from './ScheduleItem';
import userProfileService from '../../../services/UserProfileService';

export default function ScheduleHistory() {
  const [history, setHistory] = useState(null);
  const [token, forceUpdate] = useReducer((x) => x + 1, 0);

  const getSchedules = () => {
    userProfileService.getPaginatedScheduleHistory(1)
      .then((res) => {
        setHistory(res.response.data.pagination);
      });
  };

  // eslint-disable-next-line no-unused-vars
  const handlePageChange = async (_, page) => {
    userProfileService.getPaginatedScheduleHistory(page)
      .then((res) => {
        setHistory(res.response.data.pagination);
      });
    forceUpdate();
  };

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <Box>
      <Grid
        container
        spacing={2}
      >
        {
          history
            // eslint-disable-next-line react/no-array-index-key
            ? history.schedules.map((i, idx) => <ScheduleItem key={`schedule-${idx}`} details={i} token={token} />) : ''
        }
      </Grid>
      <Pagination count={history ? history.max : 1} page={history ? history.page : 1} onChange={handlePageChange} sx={{ marginTop: '20px' }} />
    </Box>
  );
}
