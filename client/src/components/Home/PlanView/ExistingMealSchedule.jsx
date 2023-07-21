import {
  ExpandLess, ExpandMore,
} from '@mui/icons-material';
import {
  Collapse, Grid, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function MealScheduleCollapse(props) {
  const {
    index,
    handleClick,
    selectedIndex,
    dayPlan,
  } = props;

  return (
    <div>
      <ListItemButton key={index} onClick={() => { handleClick(index); }} divider>
        <ListItemText primary={`Day ${index + 1}`} />
        {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {dayPlan && Object.keys(dayPlan).map((meal) => (
        <Collapse
          in={index === selectedIndex}
          timeout="auto"
          unmountOnExit
          key={`${index} ${meal.toString()}`}
        >
          <ListItem>
            <ListItemText
              secondary={`${meal.toString()}: ${dayPlan[meal]}`}
            />
          </ListItem>
        </Collapse>
      ))}
    </div>
  );
}

MealScheduleCollapse.propTypes = {
  index: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedIndex: PropTypes.string.isRequired,
  dayPlan: PropTypes.shape({
    breakfast: PropTypes.string,
    snack1: PropTypes.string,
    lunch: PropTypes.string,
    snack2: PropTypes.string,
    dinner: PropTypes.string,
  }).isRequired,
};

export default function ExistingMealSchedule() {
  const [schedule, setSchedule] = useState();
  const [selectedIndex, setSelectedIndex] = useState('');
  const { mealSchedule } = useSelector(
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
        {schedule && Object.keys(schedule).map((day, index) => (
          <MealScheduleCollapse
            dayPlan={schedule[day]}
            handleClick={handleClick}
            index={index}
            key={`${day} meal`}
            selectedIndex={selectedIndex}
          />
        ))}
      </List>
    </Grid>
  );
}
