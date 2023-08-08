/* eslint-disable react/prop-types */
import {
  Box, Paper, Typography,
} from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

import theme from '../../../theme';
import ExercisesTable from '../../Workout/ExercisesTable';

const styles = {
  container: {
    color: theme.palette.secondary.light,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    width: '100%',
  },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function Item({ workout }) {
  const day = Object.keys(workout)[0];
  const exercisesArray = workout[day];

  return (
    <Box>
      <Paper sx={styles.paperContainer}>
        <Typography variant="h6" component="div" color="text.secondary" sx={{ mb: 3 }}>
          {day}
        </Typography>
        <ExercisesTable exercises={exercisesArray} />
      </Paper>
    </Box>
  );
}

export default function WorkoutBrowserCarousel({ workoutData }) {
  const workouts = Object.entries(workoutData.schedule)
    .map(([day, { exercises }]) => ({
      [day]: exercises,
    }));

  return (
    <Box sx={styles.container}>
      <Carousel
        sx={styles.carouselContainer}
        indicators={false}
        navButtonsAlwaysVisible
        navButtonsWrapperProps={{
          style: {
            bottom: '-5%',
            top: 'unset',
          },
        }}
        navButtonsProps={{
          style: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.dark,
          },
        }}
      >
        {
            workouts.map((workout) => (
              <Item
                key={Object.keys(workout)[0]}
                workout={workout}
              />
            ))
        }
      </Carousel>
    </Box>
  );
}
