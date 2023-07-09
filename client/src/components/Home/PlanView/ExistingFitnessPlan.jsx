import {
  ExpandLess, ExpandMore,
} from '@mui/icons-material';
import {
  Collapse, Grid, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ExistingFitnessPlan() {
  const [plan, setPlan] = useState();
  const [selectedIndex, setSelectedIndex] = useState('');
  const fitnessPlan = useSelector((state) => state.fitnessPlan);
  let counter = 0;

  const handleClick = (index) => {
    if (index === selectedIndex) {
      setSelectedIndex('');
    } else {
      setSelectedIndex(index);
    }
  };

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
        {plan && Object.keys(plan).map((day, index) => {
          const dayPlan = plan[day];
          counter += 1;
          return (
            <div>
              <ListItemButton key={counter} onClick={() => { handleClick(index); }} divider>
                <ListItemText primary={`Day ${counter}`} />
                {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {dayPlan && dayPlan.map((workout) => (
                <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                  <ListItem>
                    <ListItemText
                      secondary={`Do ${workout.exercise} for ${workout.sets} sets, 
                      ${workout.reps} reps with a ${workout.rest} 
                      second break between sets.`}
                    />
                  </ListItem>
                </Collapse>
              ))}
            </div>
          );
        })}
      </List>
    </Grid>
  );
}
