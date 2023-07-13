import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {
  Tab, Tabs,
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExistingMealSchedule from './ExistingMealSchedule';
import ExistingWorkoutSchedule from './ExistingWorkoutSchedule';
import NoSchedule from './NoSchedule';
import { getWorkoutAndMealSchedule, resetWorkoutAndMealScheduleStates } from '../../../reducers/WorkoutAndMealSchedule';
import { ToastContext } from '../../common/context/ToastContextProvider';
import RelativeSpinner from '../../common/RelativeSpinner';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function TabbedScheduleView() {
  const dispatch = useDispatch();
  const openToast = useContext(ToastContext);
  const [gettingMealSchedule, setGettingMealSchedule] = useState(false);
  const [value, setValue] = useState(0);
  const {
    isLoading, workoutSchedule, mealSchedule, isError, isSuccess, message,
  } = useSelector((state) => state.workoutAndMealSchedule);

  useEffect(() => {
    if (!workoutSchedule || !mealSchedule) {
      setGettingMealSchedule(true);
      dispatch(getWorkoutAndMealSchedule());
    }
  }, []);

  useEffect(() => {
    if (isError && gettingMealSchedule) {
      openToast('success', 'Let\'s create a meal & workout schedule!');
      dispatch(resetWorkoutAndMealScheduleStates());
    }

    if (isError && !gettingMealSchedule) {
      openToast('error', message);
      dispatch(resetWorkoutAndMealScheduleStates());
    }

    if (isSuccess && !gettingMealSchedule) {
      openToast('success', 'Your schedule has been created!');
      dispatch(resetWorkoutAndMealScheduleStates());
    }

    if (isSuccess && gettingMealSchedule) {
      openToast('success', 'Your schedule has been loaded!');
      dispatch(resetWorkoutAndMealScheduleStates());
      setGettingMealSchedule(false);
    }
  }, [workoutSchedule, mealSchedule, isError, isSuccess, message, dispatch]);

  return (
    <Box sx={{
      backgroundColor: 'white',
      position: 'relative',
      width: '100%',
      height: '100%',
      zIndex: 0,
    }}
    >
      {isLoading && <RelativeSpinner />}
      <Tabs value={value} onChange={(e, v) => setValue(v)} aria-label="icon label tabs example">
        <Tab
          icon={<FitnessCenterIcon fontSize="large" />}
          label="Fitness Plan"
          sx={{
            width: '50%',
          }}
        />
        <Tab
          icon={<LocalDiningIcon fontSize="large" />}
          label="Meal Plan"
          sx={{
            width: '50%',
          }}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        {workoutSchedule ? <ExistingWorkoutSchedule /> : <NoSchedule />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {mealSchedule ? <ExistingMealSchedule /> : <NoSchedule />}
      </TabPanel>

    </Box>
  );
}
