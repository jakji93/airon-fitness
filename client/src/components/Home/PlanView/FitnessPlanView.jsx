import {
  Grid, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

import ExistingFitnessPlan from './ExistingFitnessPlan';
import NoFitnessPlan from './NoFitnessPlan';

export default function FitnessPlanView() {
  const hasFitnessPlan = useSelector((state) => state.hasFitnessPlan);
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5" className="header-message">Fitness Plan</Typography>
        </Grid>
      </Grid>
      {hasFitnessPlan ? <ExistingFitnessPlan /> : <NoFitnessPlan />}
    </div>
  );
}
