import {
  ExpandLess, ExpandMore,
} from '@mui/icons-material';
import {
  Collapse, Grid, List, ListItem, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmationModal from './ConfirmationModal';
import { createWorkoutAndMealSchedule, createWorkoutSchedule } from '../../../reducers/WorkoutAndMealSchedule';
import { StyledButton } from '../../../styled';
import theme from '../../../theme';

function InstructionString(exercise, set, rep, rest, duration) {
  if (exercise === 'Rest') {
    return 'Rest day';
  }
  let resString = '';
  if (set === 1) {
    if (rep === 1) {
      resString = `Do ${exercise} for ${duration} minutes`;
    } else {
      resString = `Do ${exercise} for ${set} set with ${rep} reps`;
    }
  } else if (rest === 0) {
    if (rep === 1) {
      resString = `Do ${exercise} for ${set} sets, ${rep} rep with no rest between sets`;
    } else {
      resString = `Do ${exercise} for ${set} sets, ${rep} reps with no rest between sets`;
    }
  } else if (rep === 1) {
    resString = `Do ${exercise} for ${set} sets, ${rep} rep with a ${rest}-second rest between sets`;
  } else {
    resString = `Do ${exercise} for ${set} sets, ${rep} reps with a ${rest}-second rest between sets`;
  }

  return resString;
}

function WorkoutScheduleCollapse(props) {
  const {
    index,
    handleClick,
    selectedIndices,
    daySchedule,
    day,
  } = props;
  const workoutSchedule = daySchedule.exercises;
  const isExpanded = selectedIndices.includes(index);
  return (
    <div>
      <ListItemButton
        key={index}
        onClick={() => { handleClick(index); }}
        divider
        sx={{
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
        }}
      >
        <ListItemText primary={day} />
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
              disableTypography
              secondary={(
                <Typography
                  variant="body2"
                  style={{
                    color: theme.palette.secondary.light,
                  }}
                >{(
                  InstructionString(
                    workout.exercise,
                    workout.sets,
                    workout.reps,
                    workout.rest,
                    workout.duration,
                  )
              )}</Typography>
)}
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
  day: PropTypes.string.isRequired,
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
        <StyledButton
          fullWidth
          variant="contained"
          sx={{
            mb: 1,
            backgroundColor: theme.palette.secondary.main,
          }}
          size="medium"
          onClick={() => setUpdateBothModal(true)}
          color="secondary"
        >
          Regenerate Both Plans
        </StyledButton>
      </Grid>
      <Grid item xs={12}>
        <StyledButton
          fullWidth
          variant="contained"
          sx={{
            mb: 1,
          }}
          size="medium"
          onClick={() => setUpdateWorkoutModal(true)}
        >Regenerate Workout Plan
        </StyledButton>
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
            width: '100%',
            maxheight: '100%',
            overflow: 'auto',
          }}
        >
          {workoutSchedule.schedule && Object.keys(workoutSchedule.schedule).map((day, index) => (
            <WorkoutScheduleCollapse
              index={index}
              handleClick={handleClick}
              selectedIndices={selectedIndices}
              daySchedule={workoutSchedule.schedule[day]}
              key={`${day} workout`}
              day={day}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
