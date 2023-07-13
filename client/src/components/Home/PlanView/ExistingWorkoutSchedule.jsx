import {
  ExpandLess, ExpandMore,
} from '@mui/icons-material';
import {
  Collapse, Grid, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ExistingWorkoutSchedule() {
  const [schedule, setSchedule] = useState();
  const [selectedIndex, setSelectedIndex] = useState('');
  const { workoutSchedule } = useSelector(
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
    setSchedule(workoutSchedule.schedule);
  }, [workoutSchedule]);

  return (
    <Grid container>
      <List
        sx={{
          width: '100%', maxheight: '100%', overflow: 'auto', bgcolor: 'background.paper',
        }}
      >
        {schedule && Object.keys(schedule).map((day, index) => {
          const daySchedule = schedule[day];
          counter += 1;
          return (
            <div key={counter}>
              <ListItemButton key={counter} onClick={() => { handleClick(index); }} divider>
                <ListItemText primary={`Day ${counter}`} />
                {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {daySchedule && daySchedule.map((workout) => (
                <Collapse key={`${counter}-${workout.exercise}`} in={index === selectedIndex} timeout="auto" unmountOnExit>
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
