import {
  ExpandLess, ExpandMore,
} from '@mui/icons-material';
import {
  Collapse, Grid, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ExistingMealPlan() {
  const [plan, setPlan] = useState();
  const [selectedIndex, setSelectedIndex] = useState('');
  const mealPlan = useSelector((state) => state.mealPlan);
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
    setPlan(mealPlan.plan);
  }, []);

  return (
    <Grid container>
      <List
        sx={{
          width: '100%', maxheight: '100%', overflow: 'auto', bgcolor: 'background.paper',
        }}
      >
        {plan && plan.mealPlan && Object.keys(plan.mealPlan).map((day, index) => {
          const dayPlan = plan.mealPlan[day];
          counter += 1;
          return (
            <div>
              <ListItemButton key={counter} onClick={() => { handleClick(index); }} divider>
                <ListItemText primary={`Day ${counter}`} />
                {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {dayPlan && Object.keys(dayPlan).map((meal) => (
                <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                  <ListItem>
                    <ListItemText
                      secondary={`${meal.toString()}: ${dayPlan[meal]}`}
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
