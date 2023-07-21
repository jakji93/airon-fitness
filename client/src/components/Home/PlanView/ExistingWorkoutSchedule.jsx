import {
  ExpandLess, ExpandMore,
} from '@mui/icons-material';
import {
  Collapse, Grid, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function WorkoutScheduleCollapse(props) {
  const {
    index,
    handleClick,
    selectedIndex,
    daySchedule,
  } = props;
  return (
    <div>
      <ListItemButton key={index} onClick={() => { handleClick(index); }} divider>
        <ListItemText primary={`Day ${index + 1}`} />
        {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {daySchedule && daySchedule.map((workout) => (
        <Collapse
          key={`${index}-${workout.exercise}`}
          in={index === selectedIndex}
          timeout="auto"
          unmountOnExit
        >
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
}

WorkoutScheduleCollapse.propTypes = {
  index: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  daySchedule: PropTypes.arrayOf(PropTypes.shape({
    exercise: PropTypes.string,
    sets: PropTypes.number,
    reps: PropTypes.number,
    rest: PropTypes.number,
    duration: PropTypes.number,
    intensity: PropTypes.number,
  })).isRequired,
};

export default function ExistingWorkoutSchedule() {
  const [schedule, setSchedule] = useState();
  const [selectedIndex, setSelectedIndex] = useState('');
  const { workoutSchedule } = useSelector(
    (state) => state.workoutAndMealSchedule,
  );

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
        {schedule && Object.keys(schedule).map((day, index) => (
          <WorkoutScheduleCollapse
            index={index}
            handleClick={handleClick}
            selectedIndex={selectedIndex}
            daySchedule={schedule[day]}
            key={`${day} workout`}
          />
        ))}
      </List>
    </Grid>
  );
}
