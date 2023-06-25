import {
  Button, Card, Grid, Typography,
} from '@mui/material';
import React, { useState } from 'react';

import ExistingFitnessPlan from './ExistingFitnessPlan';
// import { useDispatch } from 'react-redux';

// import fetchFitnessPlan from '../../../actionCreators/FitnessPlan';

export default function NoFitnessPlan() {
  const [state, setState] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchFitnessPlan());
  // }, [dispatch]);

  return (
    <div>
      {!state && (
        <Grid container component={Card} alignItems="center" sx={{ p: 5 }}>
          <Grid item xs>
            <Typography variant="h3" component="div" color="text.secondary">
              You currently do not have a plan
            </Typography>
          </Grid>
          <Button variant="outlined" onClick={() => setState(true)}>Create My Plan</Button>
        </Grid>
      )}
      {state && <ExistingFitnessPlan />}
    </div>
  );
}
