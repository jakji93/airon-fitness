import {
  Grid, List, ListItem, ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ExistingFitnessPlan() {
  const [plan, setPlan] = useState();
  const fitnessPlan = useSelector((state) => state.fitnessPlan);

  useEffect(() => {
    // TODO: uncomment this when backend api is set up
    // if (fitnessPlan.loading || fitnessPlan.error) return;
    setPlan(fitnessPlan.plan);
  }, []);
  return (
    <Grid container>
      <List
        sx={{
          width: '100%', maxheight: '100%', overflow: 'auto', bgcolor: 'background.paper',
        }}
      >
        {plan && Object.keys(plan).map((day) => {
          const dayPlan = plan[day];
          return (
            <div>
              <ListItem divider>
                <ListItemText primary={day} />
              </ListItem>
              {dayPlan && dayPlan.map((workout) => (
                <ListItem>
                  <ListItemText
                    secondary={`Do ${workout.exercise} for ${workout.sets} sets, 
                    ${workout.reps} reps with a ${workout.rest} 
                    second break between sets.`}
                  />
                </ListItem>
              ))}
            </div>
          );
        })}
      </List>
    </Grid>
  );
}
