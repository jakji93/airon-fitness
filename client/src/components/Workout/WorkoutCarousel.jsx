/* eslint-disable react/prop-types */
import {
  Box, Button, Paper, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Typewriter from 'typewriter-effect';

import ExercisesTable from './ExercisesTable';
import WorkoutStatesEnum from './WorkoutFlowStates';
import WorkoutScheduleShape from './WorkoutPropTypes';
import theme from '../../theme';

const styles = {
  container: {
    color: theme.palette.secondary.light,
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
  typewriterContainer: {
    fontFamily: theme.typography.fontFamily,
    color: '#F3F3F0',
    fontWeight: 400,
    fontSize: '4vw',
    paddingBottom: '30px',
  },
  paperContainer: {
    display: 'flex',
    flexDirection: 'column', // Arrange children vertically
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
  },
  dayTypography: {
    color: theme.palette.secondary.dark,
    fontSize: '4vw',
    paddingTop: '20px',
  },
  workoutSelectButton: {
    fontWeight: 'normal',
    color: theme.palette.secondary.light,
    borderColor: '#B5936B',
    backgroundColor: theme.palette.secondary.dark,
    marginTop: '25px',
    marginBottom: '25px',
    padding: '15px',
    fontSize: '0.75vw',
    width: '15vw',
    position: 'relative', // Set the position to relative for the pseudo-element
    overflow: 'hidden', // Hide any overflow from the pseudo-element
    '&:hover': {
      color: theme.palette.secondary.light,
      borderColor: '#F3F3F0',
      backgroundColor: theme.palette.secondary.main,
      transition: 'background-color 0.5s ease',
    },
  },
};

function Item({ workout, onNext }) {
  const day = Object.keys(workout)[0];
  const exercisesArray = workout[day];

  return (
    <Box>
      <Paper sx={styles.paperContainer}>
        <Typography sx={styles.dayTypography}>
          {day}
        </Typography>
        <Button onClick={() => onNext(WorkoutStatesEnum.IN_SESSION)} variant="outlined" sx={styles.workoutSelectButton}>
          START WORKOUT
        </Button>
        <ExercisesTable exercises={exercisesArray} />
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
      <Box sx={styles.typewriterContainer}>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.changeDelay(40)
              .typeString('Choose your workout.')
              .start();
          }}
        />
      </Box>

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
              workouts.map((workout) => (
                <Item
                  key={Object.keys(workout)[0]}
                  workout={workout}
                  onNext={onNext}
                />
              ))
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
