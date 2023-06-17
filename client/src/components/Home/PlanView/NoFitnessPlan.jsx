import {
  Button, Card, Grid, Typography,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import { createFitnessPlan } from '../../../actions/actions';

export default function NoFitnessPlan() {
  const dispatch = useDispatch();
  return (
    <div>
      <Grid container component={Card} alignItems="center" sx={{ p: 5 }}>
        <Grid item xs>
          <Typography variant="h3" component="div" color="text.secondary">
            You currently do not have a plan
          </Typography>
        </Grid>
        <Button variant="outlined" onClick={() => dispatch(createFitnessPlan())}>Create My Plan</Button>
      </Grid>
    </div>
  );
}
