import {
  Box,
  Button,
} from '@mui/material';
import React from 'react';
import Typewriter from 'typewriter-effect';

import AironLogo from '../assets/design/LogoTan.png';
import theme from '../theme';

// Create a new Date object
const getDayOfWeekName = () => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeekNames[dayOfWeek];
};

const styles = {
  container: {
    color: 'white',
    backgroundColor: theme.palette.secondary.dark,
    minHeight: '90vh', // Set the minimum height to 100 viewport height units
    flexGrow: 1,
    display: 'flex', // Use flexbox for layout
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

export default function Workout() {
  return (
  // if current day of week has a schedule, render start workout
  // > pressing start workout button brings in the WORKOUT TIMER CAROUSEL COMPONENT
  // if current day of week has no schedule, render choose workout
  // > pressing choose workout brings in the WORKOUT SELECTION CAROUSEL COMPONENT
  // > hover on a carousel card, indicating it can be selected
  // > click a carousel card to bring you to WORKOUT TIMER CAROUSEL COMPONENT
    <Box style={styles.container}>
      <Box style={styles.typewriterContainer}>
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
      </Box>
      <img
        src={AironLogo}
        alt="logo"
        style={styles.logo}
      />
      <Button
        variant="outlined"
        href="/about"
        sx={styles.startButton}
      >
        START WORKOUT
      </Button>
    </Box>

  );
}
