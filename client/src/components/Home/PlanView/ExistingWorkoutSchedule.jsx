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

import ConfirmationModal from './ConfirmationModal';
import { createWorkoutAndMealSchedule, createWorkoutSchedule } from '../../../reducers/WorkoutAndMealSchedule';

function WorkoutScheduleCollapse(props) {
  const {
    index,
    handleClick,
    selectedIndices,
    daySchedule,
  } = props;
  const workoutSchedule = daySchedule.exercises;
  const isExpanded = selectedIndices.includes(index);
  return (
    <div>
      <ListItemButton key={index} onClick={() => { handleClick(index); }} divider>
        <ListItemText primary={`Day ${index + 1}`} />
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {workoutSchedule && workoutSchedule.map((workout) => (
        <Collapse
          key={`${index}-${workout.exercise}`}
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          tabIndex={0}
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
  selectedIndices: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
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
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [updateWorkoutModal, setUpdateWorkoutModal] = useState(false);
  const [updateBothModal, setUpdateBothModal] = useState(false);
  const { workoutSchedule } = useSelector(
    (state) => state.workoutAndMealSchedule,
  );

  const handleClick = (index) => {
    if (selectedIndices.includes(index)) {
      return setSelectedIndices((prevIndices) => prevIndices.filter((i) => i !== index));
    }
    return setSelectedIndices((prevIndices) => [...prevIndices, index]);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 1 }}
          size="medium"
          onClick={() => setUpdateBothModal(true)}
        >
          Regenerate Both Plans
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 1 }}
          size="medium"
          onClick={() => setUpdateWorkoutModal(true)}
        >Regenerate Workout Plan
        </Button>
      </Grid>
      <ConfirmationModal
        open={updateWorkoutModal}
        setOpen={setUpdateWorkoutModal}
        onYes={() => dispatch(createWorkoutSchedule())}
        dialogTitle="Regenerate your workout plan?"
        dialogContent="Would you like to regenerate your workout plan using updated profile data
        without previous custom inputs? This may take a couple minutes."
      />
      <ConfirmationModal
        open={updateBothModal}
        setOpen={setUpdateBothModal}
        onYes={() => dispatch(createWorkoutAndMealSchedule())}
        dialogTitle="Regenerate both plans?"
        dialogContent="Would you like to regenerate both your meal plan and workout plan using updated profile data
        without previous custom inputs? This may take a couple minutes."
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
              selectedIndices={selectedIndices}
              daySchedule={workoutSchedule.schedule[day]}
              key={`${day} workout`}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
