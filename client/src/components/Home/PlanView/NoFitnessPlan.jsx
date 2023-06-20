import {
  Button, Card, Grid, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import fetchFitnessPlan from '../../../actionCreators/FitnessPlan';

export default function NoFitnessPlan() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFitnessPlan());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Grid container component={Card} alignItems="center" sx={{ p: 5 }}>
        <Grid item xs>
          <Typography variant="h3" component="div" color="text.secondary">
            You currently do not have a plan
          </Typography>
        </Grid>
        <Button variant="outlined" onClick={() => handleSubmit}>Create My Plan</Button>
      </Grid>
    </div>
  );
}
