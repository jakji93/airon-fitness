import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import fetchFitnessPlan from '../actionCreators/FitnessPlan';

export default function Home() {
  const [plan, setPlan] = useState();
  const fitnessPlan = useSelector((state) => state.fitnessPlan);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFitnessPlan());
  }, [dispatch]);

  useEffect(() => {
    // TODO: uncomment this when backend api is set up
    // if (fitnessPlan.loading || fitnessPlan.error) return;
    setPlan(fitnessPlan.plan);
  }, []);
  return (
    <>
      <Typography variant="h1">
        Home Page
      </Typography>
      {plan && Object.keys(plan).map((day) => {
        const dayPlan = plan[day];
        return (
          <>
            <Typography key={day} variant="h1">{day}</Typography>
            {dayPlan && dayPlan.map((workout) => (
              <Typography key={`${day}-${workout.exercise}`} variant="body1">
                {`Do ${workout.exercise} for ${workout.sets} sets, 
              ${workout.reps} reps with a ${workout.rest} 
              second break between sets.`}
              </Typography>
            ))}
          </>
        );
      })}
    </>
  );
}
