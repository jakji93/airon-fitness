import {
  Box,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import Typewriter from 'typewriter-effect';

import WorkoutStatesEnum from './WorkoutFlowStates';
import { WorkoutScheduleShape } from './WorkoutPropTypes';
import AironLogo from '../../assets/design/LogoTan.png';
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
    fontSize: '0.75vw',
    width: '15vw',
    position: 'relative', // Set the position to relative for the pseudo-element
    overflow: 'hidden', // Hide any overflow from the pseudo-element
    '&:hover': {
      fontWeight: 'bolder',
      color: '#3F3F47',
      borderColor: '#F3F3F0',
      backgroundColor: '#ffffff',
      transition: 'background-color 0.5s ease',
      '&::after': {
        content: "''",
        position: 'absolute',
        top: '-10%', // Adjust the positioning to cover the entire button
        left: '-10%', // Adjust  the positioning to cover the entire button
        width: '120%',
        height: '120%',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), transparent)',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'opacity 0.3s ease',
      },
      '&:hover::after': {
        opacity: 1,
      },
    },
  },
};

const getDayOfWeekName = () => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeekNames[dayOfWeek];
};

// const isWorkoutDay = () => {

// };

export default function WorkoutSelector({ workoutData, onNext }) {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.typewriterContainer}>
        {workoutData ? (
          <Typewriter
            onInit={(typewriter) => {
              typewriter.changeDelay(40)
                .changeDeleteSpeed(10)
                .typeString(`Time for your ${getDayOfWeekName()} workout.`)
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
                .typeString(`No workout scheduled for ${getDayOfWeekName()}.`)
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

      {workoutData ? (
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

WorkoutSelector.propTypes = {
  workoutData: WorkoutScheduleShape.isRequired,
  onNext: PropTypes.func.isRequired,
};
