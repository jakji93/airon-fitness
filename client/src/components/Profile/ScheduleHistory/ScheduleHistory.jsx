/* eslint-disable react/no-array-index-key */
import {
  Grid, Pagination, Box, Paper,
} from '@mui/material';
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

  const handlePageChange = async (...args) => {
    userProfileService.getPaginatedScheduleHistory(args[1])
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
            ? history.schedules.map((i, idx) => (i.schedule ? <ScheduleItem key={`schedule-${idx}`} details={i} token={token} /> : (
              <Grid item key={`schedule-${idx}`} xs={12} lg={6} sx={{ margin: '8px 0' }}>
                <Paper
                  elevation={3}
                  sx={{
                    width: '100%', height: '100px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  }}
                  tabIndex={0}
                >
                  Generation in progress!
                </Paper>
              </Grid>
            ))) : ''
        }
      </Grid>
      <Pagination
        count={history ? history.max : 1}
        page={history ? history.page : 1}
        onChange={handlePageChange}
        sx={{
          marginTop: '20px',
          '& .MuiPaginationItem-root': {
            color: (theme) => theme.palette.secondary.light,
          },
          '& .MuiPaginationItem-page.Mui-selected': {
            color: (theme) => theme.palette.secondary.dark,
            backgroundColor: (theme) => theme.palette.secondary.main,
          },
          '& .MuiPaginationItem-page.Mui-selected:hover': {
            color: (theme) => theme.palette.secondary.dark,
            backgroundColor: (theme) => theme.palette.secondary.hover,
          },
          '& .MuiPaginationItem-root:hover': {
            color: (theme) => theme.palette.secondary.main,
          },
        }}
      />
    </Box>
  );
}
