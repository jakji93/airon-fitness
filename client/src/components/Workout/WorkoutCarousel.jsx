/* eslint-disable react/prop-types */
import {
  Box, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Typewriter from 'typewriter-effect';

import ExercisesTable from './ExercisesTable';
import WorkoutStatesEnum from './WorkoutFlowStates';
import { StyledButton } from '../../styled';
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayTypography: {
    color: theme.palette.secondary.main,
    fontSize: '4vw',
    paddingTop: '20px',
  },
  workoutButton: {
    fontWeight: 'normal',
    borderColor: theme.palette.secondary.main,
    marginTop: '25px',
    marginBottom: '25px',
    padding: '15px',
    fontSize: 'clamp(10px, 0.75vw, 50px)',
    width: 'clamp(150px, 15vw, 1000px)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      borderColor: theme.palette.secondary.main,
    },
  },
};

function Item({ handleDay, workout, onNext }) {
  const day = Object.keys(workout)[0];
  const exercisesArray = workout[day];

  return (
    <Box>
      <Container sx={styles.paperContainer}>
        <Typography sx={styles.dayTypography}>
          {day}
        </Typography>
        <StyledButton
          onClick={() => {
            onNext(WorkoutStatesEnum.IN_SESSION);
            handleDay(day);
          }}
          variant="outlined"
          sx={styles.workoutButton}
        >
          START WORKOUT
        </StyledButton>
        <ExercisesTable exercises={exercisesArray} />
      </Container>
    </Box>
  );
}

export default function WorkoutCarousel({ handleDay, workoutData, onNext }) {
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
                  handleDay={handleDay}
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
