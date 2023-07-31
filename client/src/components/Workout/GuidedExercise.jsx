/* eslint-disable react/prop-types */
import InfoIcon from '@mui/icons-material/Info';
import {
  Box, Button, Typography, Paper, Popover,
} from '@mui/material';
// import PropTypes from 'prop-types';
import React from 'react';

import WorkoutStatesEnum from './WorkoutFlowStates';
// import { WorkoutScheduleShape } from './WorkoutPropTypes';
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
  exerciseTypography: {
    color: theme.palette.secondary.dark,
    fontSize: '4vw',
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
  circularDataDisplay: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default function GuidedExercise({
  e, onNext, isLastExercise,
}) {
  // Popover state
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Set count state
  const [currentExerciseSetCount, setCurrentExerciseSetCount] = React.useState(null);

  const initExerciseSetCount = (n) => {
    setCurrentExerciseSetCount(n);
  };

  const handleFinishedSet = () => {
    setCurrentExerciseSetCount(currentExerciseSetCount - 1);
  };

  React.useEffect(() => {
    initExerciseSetCount(e.sets);
  }, [e.sets]);

  // Rest timer state
  const [restTimer, setRestTimer] = React.useState(e.rest);
  const [pause, setPause] = React.useState(true);

  const initialRestTimer = React.useRef(e.rest);
  const intervalRef = React.useRef();

  const decrementTimer = () => {
    setRestTimer((prev) => prev - 1);
    if (restTimer === 1) {
      clearInterval(intervalRef.current);
    }
  };

  React.useEffect(() => {
    if (!pause && restTimer > 0) {
      intervalRef.current = setInterval(decrementTimer, 1000);
    } else if (restTimer === 0) {
      clearInterval(intervalRef.current);
      setPause(true);
      setRestTimer(initialRestTimer.current);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [pause, restTimer]);

  const handleTimerClick = () => {
    if (restTimer === 0) {
      setPause(true);
      setRestTimer(initialRestTimer.current);
    } else {
      setPause((prev) => !prev);
    }
  };

  return (
    <Paper sx={{
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.main,
      display: 'flex',
      flexDirection: 'column', // Arrange children vertically
      justifyContent: 'center', // Vertically center the content
      alignItems: 'center', // Horizontally center the content
    }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Typography sx={styles.exerciseTypography}>
          {e.exercise}
        </Typography>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <InfoIcon />
        </Typography>
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>
            <pre>duration: {JSON.stringify(e.duration, null, 2)}</pre>
            <pre>intensity: {JSON.stringify(e.intensity, null, 2)}</pre>
          </Typography>
        </Popover>
      </Box>

      <Box sx={{
        display: 'flex',
        gap: '50px',
      }}
      >
        <Paper sx={styles.circularDataDisplay}>
          <pre>sets remaining: {currentExerciseSetCount}</pre>
        </Paper>
        <Paper sx={styles.circularDataDisplay}>
          <pre>reps: {JSON.stringify(e.reps, null, 2)}</pre>
        </Paper>
        <Paper sx={styles.circularDataDisplay}>
          <pre>calories: {JSON.stringify(e.calories, null, 2)}</pre>
        </Paper>
      </Box>

      <Box sx={{
        display: 'flex',
      }}
      >
        {(isLastExercise && (currentExerciseSetCount === 0)) ? (
          <Paper>
            <Button onClick={() => onNext(WorkoutStatesEnum.SELECT_WORKOUT)} variant="outlined">
              CHOOSE ANOTHER WORKOUT
            </Button>
            <Button href="/app" variant="outlined">
              BACK TO HOME
            </Button>
          </Paper>
        ) : (
          <Box>
            <Button
              variant="outlined"
              sx={styles.workoutSelectButton}
            >
              RESET REST
            </Button>
            <Button
              variant="outlined"
              onClick={handleTimerClick}
              sx={styles.workoutSelectButton}
            >
              {pause ? `Rest for ${restTimer} seconds` : `${restTimer} s`}
            </Button>
            <Button
              variant="outlined"
              sx={styles.workoutSelectButton}
            >
              +15 SECONDS
            </Button>
            <Button
              variant="outlined"
              sx={styles.workoutSelectButton}
              onClick={handleFinishedSet}
            >
              Finish Set
            </Button>
          </Box>

        )}
      </Box>
    </Paper>
  );
}

GuidedExercise.propTypes = {
};
