import {
  ExpandLess, ExpandMore,
} from '@mui/icons-material';
import {
  Collapse, Grid, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ExistingMealSchedule() {
  const [schedule, setSchedule] = useState();
  const [selectedIndex, setSelectedIndex] = useState('');
  const { mealSchedule } = useSelector(
    (state) => state.workoutAndMealSchedule,
  );
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
    setSchedule(mealSchedule.schedule);
  }, []);

  return (
    <Grid container>
      <List
        sx={{
          width: '100%', maxheight: '100%', overflow: 'auto', bgcolor: 'background.paper',
        }}
      >
        {schedule && Object.keys(schedule).map((day, index) => {
          const dayPlan = schedule[day];
          const mealPlan = { ...dayPlan };
          delete mealPlan.nutrition_totals;
          counter += 1;
          return (
            <div>
              <ListItemButton key={counter} onClick={() => { handleClick(index); }} divider>
                <ListItemText primary={`Day ${counter}`} />
                {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {mealPlan && Object.keys(mealPlan).map((meal) => (
                <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                  <ListItem>
                    <ListItemText
                      secondary={`${meal.toString()}: ${mealPlan[meal]}`}
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
