/* eslint-disable react/prop-types */
import {
  Box, Button, Paper, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

import ExercisesTable from './ExercisesTable';
import WorkoutStatesEnum from './WorkoutFlowStates';
import WorkoutScheduleShape from './WorkoutPropTypes';
import theme from '../../theme';

const styles = {
  container: {
    color: 'white',
    backgroundColor: theme.palette.secondary.dark,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column', // Arrange children vertically
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
  },
  carouselContainer: {
    width: '75vw',
  },
};

function Item({ workout }) {
  const day = Object.keys(workout)[0];
  const exercisesArray = workout[day];

  return (
    <Box>
      <Paper>
        <h2>{day}</h2>
        {/* <pre>{JSON.stringify(exercise, null, 2)}</pre> */}
        {/* <pre>{JSON.stringify(workout, null, 2)}</pre> */}
        <ExercisesTable exercises={exercisesArray} />
        <Button className="CheckButton">
          Press this button!
        </Button>
      </Paper>
    </Box>

  );
}

export default function WorkoutCarousel({ workoutData, onNext }) {
  const workouts = Object.entries(workoutData.schedule)
    .map(([day, { exercises }]) => ({
      [day]: exercises,
    }));

  return (
    <Box sx={styles.container}>
      <Box>
        <Typography variant="h1" sx={{ color: '#ffffff' }}>
          Choose your workout.
        </Typography>
      </Box>

      <Button onClick={() => onNext(WorkoutStatesEnum.IN_SESSION)} variant="outlined" sx={{ color: '#ffffff' }}>
        START WORKOUT
      </Button>

      <Box>
        <Carousel
          sx={styles.carouselContainer}
          indicatorIconButtonProps={{
            style: {
              color: theme.palette.secondary.main,
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              backgroundColor: theme.palette.secondary.light,
            },
          }}
          indicatorContainerProps={{
            style: {
              padding: '20px',
            },
          }}
        >
          {
              workouts.map((workout) => <Item key={Object.keys(workout)[0]} workout={workout} />)
          }
        </Carousel>
      </Box>
    </Box>
  );
}

WorkoutCarousel.propTypes = {
  workoutData: WorkoutScheduleShape.isRequired,
  onNext: PropTypes.func.isRequired,
};

Item.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
