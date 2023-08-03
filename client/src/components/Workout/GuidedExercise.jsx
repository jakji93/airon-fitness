/* eslint-disable react/prop-types */
import InfoIcon from '@mui/icons-material/Info';
import {
  Box, Button, Typography, Paper, Popover,
} from '@mui/material';
// import PropTypes from 'prop-types';
import React from 'react';

// import CalorieDial from './CalorieDial';
import CalorieDial from './CalorieDial';
import WorkoutStatesEnum from './WorkoutFlowStates';
// import { WorkoutScheduleShape } from './WorkoutPropTypes';
import theme from '../../theme';
import { ToastContext } from '../common/context/ToastContextProvider';

const styles = {
  guidedExerciseContainer: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column', // Arrange children vertically
    justifyContent: 'center', // Vertically center the content
    alignItems: 'center', // Horizontally center the content
  },
  topRowTopographyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  exerciseTypography: {
    paddingTop: '15px',
    paddingBottom: '15px',
    paddingLeft: '7.5px',
    paddingRight: '7.5px',
    color: theme.palette.secondary.dark,
    fontSize: '4vw',
    flex: '1',
    maxWidth: '100%',
  },
  workoutButton: {
    fontWeight: 'normal',
    color: theme.palette.secondary.light,
    borderColor: '#B5936B',
    borderRadius: '10px',
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
  timerButton: {
    backgroundColor: theme.palette.secondary.main,
    width: 'clamp(100px, 5vw, 200px)',
    height: 'clamp(100px, 5vw, 200px)',
    display: 'flex',
    flexDirection: 'column',
  },
  middleDataRowContainer: {
    color: theme.palette.secondary.dark,
    display: 'flex',
    gap: '50px',
  },
  middleDataDialsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5vh',
  },
  circularDataDisplay: {
    color: theme.palette.secondary.light,
    width: 'clamp(100px, 15vw, 200px)',
    height: 'clamp(100px, 15vw, 200px)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularDataSets: {
    backgroundColor: '#6C5B7B',
  },
  circularDataReps: {
    backgroundColor: '#C06C84',
  },
  circularDataCalories: {
    backgroundColor: '#F67280',
  },
  bottomRowButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    gap: '1vw',
  },
};

export default function GuidedExercise({
  e, onNext, isLastExercise,
}) {
  const openToast = React.useContext(ToastContext);

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

  React.useEffect(() => {
    initExerciseSetCount(e.sets);
  }, [e.sets]);

  // Calorie counter state
  const [calorieCount, setCalorieCount] = React.useState(0);

  // Set and Calorie shared handler
  const handleFinishedSet = () => {
    if (currentExerciseSetCount > 0) {
      setCurrentExerciseSetCount((prevCount) => prevCount - 1);
      setCalorieCount((prevCount) => prevCount + (e.calories / e.sets));
    } else {
      openToast('info', 'All sets finished. Go next!');
    }
  };

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

  const handleTimerStart = () => {
    if (restTimer === 0) {
      setPause(true);
      setRestTimer(initialRestTimer.current);
    } else {
      setPause((prev) => !prev);
    }
  };

  const handleTimerAddition = () => {
    setRestTimer((prev) => prev + 15);
  };

  return (
    <Paper sx={styles.guidedExerciseContainer}>
      <Box sx={styles.topRowTopographyContainer}>
        <Typography sx={styles.exerciseTypography}>
          {e.exercise}
        </Typography>
        <InfoIcon
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          sx={{ height: 'clamp(25px, 3vw, 50px)', width: 'clamp(25px, 3vw, 50px)' }}
        />
        <Popover
          id="mouse-over-popover"
          sx={{ pointerEvents: 'none' }}
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
          <Box sx={{ padding: '10px' }}>
            <Typography sx={{ fontSize: 'clamp(15px, 1vw, 20px)' }}>
              Recommended
              Duration: {e.duration} minutes
            </Typography>
            <Typography sx={{ fontSize: 'clamp(15px, 1vw, 20px)' }}>
              Recommended Intensity: {e.intensity}% effort
            </Typography>
          </Box>
        </Popover>
      </Box>

      <Box sx={styles.middleDataRowContainer}>
        <Box sx={styles.middleDataDialsContainer}>
          <Paper sx={[styles.circularDataDisplay, styles.circularDataSets]}>
            <Typography sx={{ fontSize: 'clamp(20px, 6vw, 120px)' }}>
              {currentExerciseSetCount}
            </Typography>
          </Paper>
          <Typography sx={{ fontSize: 'clamp(15px, 0.5vw, 30px)' }}>
            Sets Remaining
          </Typography>
        </Box>

        <Box sx={styles.middleDataDialsContainer}>
          <Paper sx={[styles.circularDataDisplay, styles.circularDataReps]}>
            <Typography sx={{ fontSize: 'clamp(20px, 6vw, 120px)' }}>
              {e.reps}
            </Typography>
          </Paper>
          <Typography sx={{ fontSize: 'clamp(15px, 0.5vw, 30px)' }}>
            Reps
          </Typography>
        </Box>

        <Box sx={styles.middleDataDialsContainer}>
          <Paper sx={[styles.circularDataDisplay, styles.circularDataCalories]}>
            <Typography sx={{ fontSize: 'clamp(20px, 6vw, 90px)' }}>
              <CalorieDial maxValue={calorieCount} />
            </Typography>
          </Paper>
          <Typography sx={{ fontSize: 'clamp(15px, 0.5vw, 30px)' }}>
            Calories Burnt
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex' }}>
        {(isLastExercise && (currentExerciseSetCount === 0)) ? (
          <Box sx={styles.bottomRowButtonsContainer}>
            <Button
              onClick={() => onNext(WorkoutStatesEnum.SELECT_WORKOUT)}
              variant="outlined"
              sx={styles.workoutButton}
            >
              CHOOSE ANOTHER WORKOUT
            </Button>
            <Button
              href="/app"
              variant="outlined"
              sx={styles.workoutButton}
            >
              BACK TO HOME
            </Button>
          </Box>
        ) : (
          <Box sx={styles.bottomRowButtonsContainer}>
            <Button
              variant="outlined"
              sx={styles.workoutButton}
              onClick={() => {
                handleFinishedSet();
                handleTimerStart();
              }}
            >
              FINISH SET
            </Button>
            <Button
              variant="outlined"
              onClick={handleTimerStart}
              sx={[styles.workoutButton, styles.timerButton]}
            >
              <Typography sx={{ fontSize: '2vw' }}>
                {restTimer}
              </Typography>
              <Typography sx={{ fontSize: '0.5vw' }}>
                Rest Timer
              </Typography>
            </Button>
            <Button
              variant="outlined"
              onClick={handleTimerAddition}
              sx={styles.workoutButton}
            >
              +15 SECONDS
            </Button>
          </Box>

        )}
      </Box>
    </Paper>
  );
}

GuidedExercise.propTypes = {
};
