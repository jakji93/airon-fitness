import {
  ExpandLess, ExpandMore,
} from '@mui/icons-material';
import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ConfirmationModal from './ConfirmationModal';
import { createMealSchedule, createWorkoutAndMealSchedule } from '../../../reducers/WorkoutAndMealSchedule';
import { StyledButton } from '../../../styled';
import theme from '../../../theme';

function GetProperLabel(str) {
  let resStr = '';
  if (str === 'snack1') {
    resStr = 'Morning Snack';
  } else if (str === 'snack2') {
    resStr = 'Afternoon Snack';
  } else {
    resStr = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return resStr;
}

function MealScheduleCollapse(props) {
  const {
    index,
    handleClick,
    selectedIndices,
    daySchedule,
    day,
  } = props;
  const mealSchedule = { ...daySchedule };
  delete mealSchedule.nutrition_totals;
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
      {mealSchedule && Object.keys(mealSchedule).map((meal) => (
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          key={`${index}-${meal.toString()}`}
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
                >{`${GetProperLabel(meal.toString())}: ${mealSchedule[meal]}`}
                </Typography>
)}
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
  day: PropTypes.string.isRequired,
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
          sx={{ mb: 1, backgroundColor: theme.palette.secondary.main }}
          size="medium"
          onClick={() => setUpdateMealModal(true)}
          color="secondary"
        >
          Regenerate Meal Plan
        </StyledButton>
      </Grid>
      <ConfirmationModal
        open={updateMealModal}
        setOpen={setUpdateMealModal}
        onYes={() => dispatch(createMealSchedule())}
        dialogTitle="Regenerate your meal plan?"
        dialogContent="Would you like to regenerate your meal plan using updated profile data
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
          {mealSchedule.schedule && Object.keys(mealSchedule.schedule).map((day, index) => (
            <MealScheduleCollapse
              daySchedule={mealSchedule.schedule[day]}
              handleClick={handleClick}
              index={index}
              key={`${day} meal`}
              selectedIndices={selectedIndices}
              day={day}
            />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
