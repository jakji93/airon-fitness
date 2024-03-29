/* eslint-disable react/prop-types */
import {
  Box, Typography, Button,
} from '@mui/material';
import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';

import GuidedExercise from './GuidedExercise';
import theme from '../../theme';

const styles = {
  container: {
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.secondary.dark,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    width: '80vw',
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseTypography: {
    color: theme.palette.secondary.dark,
    fontSize: '4vw',
  },
  workoutButton: {
    fontWeight: 'normal',
    color: theme.palette.secondary.light,
    borderColor: '#B5936B',
    backgroundColor: theme.palette.secondary.dark,
    marginTop: '25px',
    marginBottom: '25px',
    padding: '15px',
    fontSize: 'clamp(7.5px, 0.75vw, 50px)',
    width: 'clamp(50px, 15vw, 1000px)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      color: theme.palette.secondary.light,
      borderColor: '#F3F3F0',
      backgroundColor: theme.palette.secondary.main,
      transition: 'background-color 0.5s ease',
    },
  },
  circularDataDisplay: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function GuidedWorkout({ sessionDay, workoutData, onNext }) {
  const workouts = Object.entries(workoutData.schedule)
    .map(([day, { exercises }]) => ({
      [day]: exercises,
    }));

  const getWorkoutForDay = (day) => {
    const foundWorkout = workouts.find((workoutObj) => day in workoutObj);
    return foundWorkout ? foundWorkout[day] : null;
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
    <Box sx={styles.container}>
      { getWorkoutForDay(sessionDay) ? (
        <Carousel
          onChange={(now) => setCurrentSlideIndex(now)}
          sx={styles.carouselContainer}
          autoPlay={false}
          navButtonsAlwaysVisible={false}
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
            getWorkoutForDay(sessionDay).map((e, index) => (
              <GuidedExercise
                key={e.exercise}
                e={e}
                onNext={onNext}
                isLastExercise={(index === getWorkoutForDay(sessionDay).length - 1)}
                slideIsInView={index === currentSlideIndex}
              />
            ))
          }
        </Carousel>
      ) : (
        <Box sx={styles.container}>
          <Typography sx={{ fontSize: '3vw', color: theme.palette.secondary.main }}>
            No workout for this day.
          </Typography>
          <Button
            href="/app"
            variant="outlined"
            sx={styles.workoutButton}
          >
            BACK TO HOME
          </Button>
        </Box>
      )}
    </Box>

  );
}
