import {
  ExpandLess, ExpandMore,
} from '@mui/icons-material';
import {
  Button,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmationModal from './ConfirmationModal';
import { createMealSchedule, createWorkoutAndMealSchedule } from '../../../reducers/WorkoutAndMealSchedule';

function MealScheduleCollapse(props) {
  const {
    index,
    handleClick,
    selectedIndices,
    daySchedule,
  } = props;
  const mealSchedule = { ...daySchedule };
  delete mealSchedule.nutrition_totals;
  const isExpanded = selectedIndices.includes(index);
  return (
    <div>
      <ListItemButton key={index} onClick={() => { handleClick(index); }} divider>
        <ListItemText primary={`Day ${index + 1}`} />
        {isExpanded ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {mealSchedule && Object.keys(mealSchedule).map((meal) => (
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          key={`${index}-${meal.toString()}`}
        >
          <ListItem>
            <ListItemText
              secondary={`${meal.toString()}: ${mealSchedule[meal]}`}
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
  selectedIndices: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
  daySchedule: PropTypes.shape({
    breakfast: PropTypes.string,
    snack1: PropTypes.string,
    lunch: PropTypes.string,
    snack2: PropTypes.string,
    dinner: PropTypes.string,
    nutrition_totas: PropTypes.shape({
      calories: PropTypes.number,
      protein: PropTypes.number,
      carbohydrates: PropTypes.number,
      fat: PropTypes.number,
    }),
  }).isRequired,
};

export default function ExistingMealSchedule() {
  const dispatch = useDispatch();
  const [updateMealModal, setUpdateMealModal] = useState(false);
  const [updateBothModal, setUpdateBothModal] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const { mealSchedule } = useSelector(
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
          Re-create Both Plans
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 1 }}
          size="medium"
          onClick={() => setUpdateMealModal(true)}
        >
          Re-create Meal Plan
        </Button>
      </Grid>
      <ConfirmationModal
        open={updateMealModal}
        setOpen={setUpdateMealModal}
        onYes={() => dispatch(createMealSchedule())}
        dialogTitle="Re-create your meal plan?"
        dialogContent="Would you like to re-create your meal plan using updated profile data
        and/or previous custom inputs? This may take a couple minutes."
      />
      <ConfirmationModal
        open={updateBothModal}
        setOpen={setUpdateBothModal}
        onYes={() => dispatch(createWorkoutAndMealSchedule())}
        dialogTitle="Re-create both plans?"
        dialogContent="Would you like to re-create both your meal plan and workout plan using updated profile data
        and/or previous custom inputs? This may take a couple minutes."
      />
      <Grid item xs={12}>
        <List
          sx={{
            width: '100%', maxheight: '100%', overflow: 'auto', bgcolor: 'background.paper',
          }}
        >
          {mealSchedule.schedule && Object.keys(mealSchedule.schedule).map((day, index) => (
            <MealScheduleCollapse
              daySchedule={mealSchedule.schedule[day]}
              handleClick={handleClick}
              index={index}
              key={`${day} meal`}
              selectedIndices={selectedIndices}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
