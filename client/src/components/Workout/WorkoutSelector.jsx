/* eslint-disable react/prop-types */
import {
  Box,
  Button,
} from '@mui/material';
import React from 'react';
import Typewriter from 'typewriter-effect';

import WorkoutStatesEnum from './WorkoutFlowStates';
import AironLogo from '../../assets/design/LogoTan.png';
import theme from '../../theme';

const styles = {
  container: {
    color: 'white',
    backgroundColor: theme.palette.secondary.dark,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typewriterContainer: {
    fontFamily: theme.typography.fontFamily,
    color: '#F3F3F0',
    fontWeight: 400,
    fontSize: '3vw',
    paddingBottom: '30px',
  },
  logo: {
    minWidth: '10vh',
    minHeight: '10vh',
    maxWidth: '25vh',
    maxHeight: '25vh',
    width: 'auto',
    height: 'auto',
  },
  startButton: {
    fontWeight: 'normal',
    color: '#ffffff',
    borderColor: '#B5936B',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: '25px',
    padding: '15px',
    fontSize: 'clamp(10px, 0.75vw, 50px)',
    width: 'clamp(150px, 15vw, 1000px)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      fontWeight: 'bolder',
      color: theme.palette.secondary.dark,
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.main,
      transition: 'background-color 0.5s ease',
    },
  },
};

export default function WorkoutSelector({ currentDay, workoutData, onNext }) {
  const workouts = Object.entries(workoutData.schedule)
    .map(([day, { exercises }]) => ({
      [day]: exercises,
    }));

  const getWorkoutForDay = (day) => {
    const foundWorkout = workouts.find((workoutObj) => day in workoutObj);
    return foundWorkout ? foundWorkout[day] : null;
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.typewriterContainer}>
        {getWorkoutForDay(currentDay) ? (
          <Typewriter
            onInit={(typewriter) => {
              typewriter.changeDelay(40)
                .changeDeleteSpeed(10)
                .typeString(`Time for your ${currentDay} workout.`)
                .pauseFor(2500)
                .deleteAll()
                .typeString('Ready to go? Press the start button.')
                .start();
            }}
          />
        ) : (
          <Typewriter
            onInit={(typewriter) => {
              typewriter.changeDelay(40)
                .changeDeleteSpeed(10)
                .typeString(`No workout scheduled for ${currentDay}.`)
                .pauseFor(2500)
                .deleteAll()
                .typeString('Manually start another workout?')
                .start();
            }}
          />
        )}

      </Box>
      <img
        src={AironLogo}
        alt="logo"
        style={styles.logo}
      />

      {getWorkoutForDay(currentDay) ? (
        <Button onClick={() => onNext(WorkoutStatesEnum.IN_SESSION)} variant="outlined" sx={styles.startButton}>
          START WORKOUT
        </Button>
      ) : (
        <Button onClick={() => onNext(WorkoutStatesEnum.SELECT_WORKOUT)} variant="outlined" sx={styles.startButton}>
          CHOOSE WORKOUT
        </Button>
      )}
    </Box>
  );
}
