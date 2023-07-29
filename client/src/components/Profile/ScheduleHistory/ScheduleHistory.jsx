import { Box, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';

import ScheduleItem from './ScheduleItem';
import workoutAndMealScheduleService from '../../../services/WorkoutAndMealScheduleService';

export default function ScheduleHistory() {
  const [history, setHistory] = useState(null);

  const getSchedules = () => {
    workoutAndMealScheduleService.getPaginatedWorkoutAndMealSchedule(1)
      .then((res) => {
        setHistory(res.response.data.pagination);
      });
  };

  // eslint-disable-next-line no-unused-vars
  const handlePageChange = async (_, page) => {
    workoutAndMealScheduleService.getPaginatedWorkoutAndMealSchedule(page)
      .then((res) => {
        setHistory(res.response.data.pagination);
      });
  };

  useEffect(() => {
    getSchedules();
  }, []);

  return (
    <Box sx={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto',
    }}
    >
      {
        history
          // eslint-disable-next-line react/no-array-index-key
          ? history.items.map((i, idx) => <ScheduleItem key={`schedule-${idx}`} details={i} />) : ''
      }
      <Pagination count={history ? history.max : 1} page={history ? history.page : 1} onChange={handlePageChange} sx={{ marginTop: '20px' }} />
    </Box>
  );
}
