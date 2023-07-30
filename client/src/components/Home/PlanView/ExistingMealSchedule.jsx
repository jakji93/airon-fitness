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

import UpdateConfirmationModal from './UpdateConfirmationModal';
import { updateMealSchedule } from '../../../reducers/WorkoutAndMealSchedule';

function MealScheduleCollapse(props) {
  const {
    index,
    handleClick,
    selectedIndex,
    daySchedule,
  } = props;
  const mealSchedule = { ...daySchedule };
  delete mealSchedule.nutrition_totals;
  return (
    <div>
      <ListItemButton key={index} onClick={() => { handleClick(index); }} divider>
        <ListItemText primary={`Day ${index + 1}`} />
        {index === selectedIndex ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {mealSchedule && Object.keys(mealSchedule).map((meal) => (
        <Collapse
          in={index === selectedIndex}
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
  selectedIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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

  return (
    <Grid container>
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
      <UpdateConfirmationModal
        open={updateMealModal}
        setOpen={setUpdateMealModal}
        onYes={() => dispatch(updateMealSchedule())}
        dialogTitle="Re-create your meal plan?"
        dialogContent="Would you like to re-create your meal plan using updated profile data
        and/or previous custom inputs? This may take 0-2 minutes."
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
              selectedIndex={selectedIndex}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
