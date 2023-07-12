import {
  Button, Grid, Typography,
} from '@mui/material';
import React, { useState } from 'react';

import ExistingFitnessPlan from './ExistingFitnessPlan';
// import { useDispatch } from 'react-redux';

// import fetchFitnessPlan from '../../../actionCreators/FitnessPlan';

export default function NoPlan() {
  const [state, setState] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchFitnessPlan());
  // }, [dispatch]);

  return (
    <div>
      {!state && (
        <Grid container alignItems="center" sx={{ p: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h5" component="div" color="text.secondary">
              You have not created a plan
            </Typography>
          </Grid>
          <Button variant="outlined" onClick={() => setState(true)}>Create My Plan</Button>
        </Grid>
      )}
      {state && <ExistingFitnessPlan />}
    </div>
  );
}
