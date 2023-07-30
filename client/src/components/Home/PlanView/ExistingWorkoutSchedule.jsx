import {
  ExpandLess, ExpandMore,
} from '@mui/icons-material';
import {
  Button,
  Collapse, Grid, List, ListItem, ListItemButton, ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UpdateConfirmationModal from './UpdateConfirmationModal';
import { updateWorkoutSchedule } from '../../../reducers/WorkoutAndMealSchedule';

function WorkoutScheduleCollapse(props) {
  const {
    index,
    handleClick,
    selectedIndex,
    daySchedule,
  } = props;
  const workoutSchedule = daySchedule.exercises;
  return (
    <div>
      <ListItemButton key={index} onClick={() => { handleClick(index); }} divider>
        <ListItemText primary={`Day ${index + 1}`} />
        {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {workoutSchedule && workoutSchedule.map((workout) => (
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
  daySchedule: PropTypes.shape({
    exercises: PropTypes.arrayOf(PropTypes.shape({
      exercise: PropTypes.string,
      sets: PropTypes.number,
      reps: PropTypes.number,
      rest: PropTypes.number,
      duration: PropTypes.number,
      intensity: PropTypes.number,
    })),
    total_calories: PropTypes.number,
  }).isRequired,
};

export default function ExistingWorkoutSchedule() {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState('');
  const [updateWorkoutModal, setUpdateWorkoutModal] = useState(false);
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

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 1 }}
          size="medium"
          onClick={() => setUpdateWorkoutModal(true)}
        >Re-create Workout Plan
        </Button>
      </Grid>
      <UpdateConfirmationModal
        open={updateWorkoutModal}
        setOpen={setUpdateWorkoutModal}
        onYes={() => dispatch(updateWorkoutSchedule())}
        dialogTitle="Re-create your workout plan?"
        dialogContent="Would you like to re-create your workout plan using updated profile data
        and/or previous custom inputs? This may take 0-2 minutes."
      />
      <Grid item xs={12}>
        <List
          sx={{
            width: '100%', maxheight: '100%', overflow: 'auto', bgcolor: 'background.paper',
          }}
        >
          {workoutSchedule.schedule && Object.keys(workoutSchedule.schedule).map((day, index) => (
            <WorkoutScheduleCollapse
              index={index}
              handleClick={handleClick}
              selectedIndex={selectedIndex}
              daySchedule={workoutSchedule.schedule[day]}
              key={`${day} workout`}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
