import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {
  Box, Button, Typography, Paper, Popover, IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, {
  useContext, useEffect, useState, useRef,
} from 'react';

import NumberDial from './NumberDial';
import Dictaphone from './VoiceRecognition/Dictaphone';
import DictaphoneDisabled from './VoiceRecognition/DictaphoneDisabled';
import WorkoutStatesEnum from './WorkoutFlowStates';
import { ExerciseShape } from './WorkoutPropTypes';
import theme from '../../theme';
import { ToastContext } from '../common/context/ToastContextProvider';

const styles = {
  guidedExerciseContainer: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  timerButton: {
    backgroundColor: theme.palette.secondary.dark,
    width: 'clamp(100px, 5vw, 200px)',
    height: 'clamp(100px, 5vw, 200px)',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      color: theme.palette.secondary.dark,
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.light,
      transition: 'background-color 0.5s ease',
    },
  },
  timerButtonRunning: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.light,
  },
  middleDataRowContainer: {
    color: theme.palette.secondary.dark,
    display: 'flex',
    gap: '5vw',
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
    width: 'clamp(40px, 15vw, 200px)',
    height: 'clamp(40px, 15vw, 200px)',
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
    paddingTop: '10px',
    gap: '1vw',
  },
};

export default function GuidedExercise({
  e, onNext, isLastExercise, slideIsInView,
}) {
  const openToast = useContext(ToastContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const [currentExerciseSetCount, setCurrentExerciseSetCount] = useState(0);

  const initExerciseSetCount = (n) => {
    setCurrentExerciseSetCount(n);
  };

  useEffect(() => {
    initExerciseSetCount(e.sets);
  }, [e.sets]);

  const [calorieCount, setCalorieCount] = useState(0);

  const [restTimer, setRestTimer] = useState(e.rest);
  const [pause, setPause] = useState(true);

  const initialRestTimer = useRef(e.rest);
  const intervalRef = useRef();

  const MAX_TIMER_VALUE = 999;

  const decrementTimer = () => {
    setRestTimer((prev) => (prev - 1 > 0 ? prev - 1 : 0));
    if (restTimer === 1) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (!pause && restTimer > 0) {
      intervalRef.current = setInterval(decrementTimer, 1000);
    } else if (restTimer === 0) {
      clearInterval(intervalRef.current);
      setPause(true);
      if (currentExerciseSetCount !== 0) {
        setRestTimer(initialRestTimer.current);
      }
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [pause, restTimer]);

  const handleTimerToggle = () => {
    if (restTimer === 0) {
      setRestTimer(initialRestTimer.current);
      setPause(true);
    } else {
      if (pause) {
        setRestTimer((prev) => (prev - 1 > 0 ? prev - 1 : 0));
      }
      setPause((prev) => !prev);
    }
  };

  const handleTimerAddition = () => {
    setRestTimer((prev) => (prev + 15 < MAX_TIMER_VALUE ? prev + 15 : MAX_TIMER_VALUE));
  };

  const handleTimerCustomAddition = (n) => {
    setRestTimer((prev) => (prev + n < MAX_TIMER_VALUE ? prev + n : MAX_TIMER_VALUE));
  };

  const handleTimerCustomSubtraction = (n) => {
    setRestTimer((prev) => (prev - n > 0 ? prev - n : 0));
  };

  const open = Boolean(anchorEl);

  const handleFinishedSet = () => {
    if (currentExerciseSetCount > 0) {
      setRestTimer(e.rest);
      setCurrentExerciseSetCount((prevCount) => prevCount - 1);
      setCalorieCount((prevCount) => prevCount + (e.calories / e.sets));
      if (currentExerciseSetCount === 1) {
        openToast('info', 'All sets finished. Go next!');
      }
    } else {
      openToast('info', 'All sets finished. Go next!');
    }
  };

  return (
    <Paper sx={styles.guidedExerciseContainer}>
      <Box sx={styles.topRowTopographyContainer} tabIndex={0}>
        <Typography sx={styles.exerciseTypography}>
          {e.exercise}
        </Typography>
      </Box>

      <Box sx={styles.middleDataRowContainer} tabIndex={0}>
        <Box sx={styles.middleDataDialsContainer}>
          <Paper sx={[styles.circularDataDisplay, styles.circularDataSets]}>
            {slideIsInView ? (
              <NumberDial styles={{ fontSize: 'clamp(20px, 6vw, 120px)' }} maxValue={currentExerciseSetCount} />
            ) : (
              <Typography sx={{ fontSize: 'clamp(20px, 6vw, 120px)' }}>
                {currentExerciseSetCount}
              </Typography>
            )}
          </Paper>
          <Typography sx={{ fontSize: 'clamp(12px, 2vw, 20px)' }}>
            Sets Remaining
          </Typography>
        </Box>

        <Box sx={styles.middleDataDialsContainer}>
          <Paper sx={[styles.circularDataDisplay, styles.circularDataReps]}>
            {slideIsInView ? (
              <NumberDial styles={{ fontSize: 'clamp(20px, 6vw, 120px)' }} maxValue={e.reps} />
            ) : (
              <Typography sx={{ fontSize: 'clamp(20px, 6vw, 120px)' }}>
                {e.reps}
              </Typography>
            )}
          </Paper>
          <Typography sx={{ fontSize: 'clamp(12px, 2vw, 20px)' }}>
            Reps
          </Typography>
        </Box>

        <Box sx={styles.middleDataDialsContainer}>
          <Paper sx={[styles.circularDataDisplay, styles.circularDataCalories]}>
            <NumberDial styles={{ fontSize: 'clamp(20px, 6vw, 90px)' }} maxValue={calorieCount} />
          </Paper>
          <Typography sx={{ fontSize: 'clamp(12px, 2vw, 20px)' }}>
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
                if (pause) {
                  handleFinishedSet();
                  handleTimerToggle();
                } else {
                  handleFinishedSet();
                }
              }}
            >
              FINISH SET
            </Button>
            <Button
              variant="outlined"
              onClick={handleTimerToggle}
              sx={pause ? [styles.workoutButton, styles.timerButton]
                : [styles.workoutButton, styles.timerButton, styles.timerButtonRunning]}
            >
              <Typography sx={{ fontSize: 'clamp(40px, 2vw, 75px)' }}>
                {restTimer}
              </Typography>
              <Typography sx={{ fontSize: 'clamp(7.5px, 0.5vw, 50px)' }}>

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
      <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
        <IconButton
          disableFocusRipple
          disableTouchRipple
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          aria-label="Recommended effort popover"
        >
          <FitnessCenterIcon sx={{ color: theme.palette.secondary.main }} />
        </IconButton>
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
        <Box>
          {slideIsInView ? (
            <Dictaphone
              slideIsInView={slideIsInView}
              timerToggle={handleTimerToggle}
              incrementTimer={handleTimerAddition}
              incrementTimerCustom={handleTimerCustomAddition}
              decrementTimerCustom={handleTimerCustomSubtraction}
              finishSet={handleFinishedSet}
              pause={pause}
            />
          ) : (
            <DictaphoneDisabled />
          )}
        </Box>
      </Box>
    </Paper>
  );
}

GuidedExercise.propTypes = {
  e: ExerciseShape.isRequired,
  onNext: PropTypes.func.isRequired,
  isLastExercise: PropTypes.bool.isRequired,
  slideIsInView: PropTypes.bool.isRequired,
};
