import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import {
  Tab, Tabs, Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ExistingFitnessPlan from './ExistingFitnessPlan';
import ExistingMealPlan from './ExistingMealPlan';
import NoPlan from './NoPlan';

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
          <Typography>{children}</Typography>
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

export default function TabbedPlanView() {
  const [value, setValue] = useState(0);
  const fitnessPlan = useSelector((state) => state.fitnessPlan);
  const mealPlan = useSelector((state) => state.mealPlan);
  return (
    <Box sx={{
      backgroundColor: 'white',
    }}
    >
      <Tabs value={value} onChange={(e, v) => setValue(v)} aria-label="icon label tabs example">
        <Tab icon={<FitnessCenterIcon fontSize="large" />} label="Fitness Plan" />
        <Tab icon={<LocalDiningIcon fontSize="large" />} label="Meal Plan" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {fitnessPlan.created ? <ExistingFitnessPlan /> : <NoPlan />}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {mealPlan.created ? <ExistingMealPlan /> : <NoPlan />}
      </TabPanel>
    </Box>
  );
}
