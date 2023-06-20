import {
  Box, Button, Card, CircularProgress, Grid, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

// @ts-ignore
import hrImg from '../../../assets/pulse.png';

function calculatePercentage(x, y) {
  const result = ((x / y) * 100).toFixed(2);
  return (Number(result));
}

function CircularProgressWithLabel(props) {
  const { value } = props;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function StatsView() {
  const hrToday = 85;
  const hrAverage = 82;
  const waterConsumed = 3;
  const waterTotal = 4;
  const waterRemaining = waterTotal - waterConsumed;
  const waterPercentage = calculatePercentage(waterConsumed, waterTotal);
  const caloriesConsumed = 1200;
  const caloriesTotal = 2500;
  const caloriesRemaining = caloriesTotal - caloriesConsumed;
  const caloriesPercentage = calculatePercentage(caloriesConsumed, caloriesTotal);

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5" className="header-message">Statistics</Typography>
        </Grid>
      </Grid>
      <Grid container component={Card} alignItems="center" sx={{ p: 5 }}>
        <Grid item xs>
          <img src={hrImg} alt="Heart Rate" />
          <Typography variant="h6" component="div" color="text.secondary">
            Heart Rate
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            Today: {hrToday} bpm
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            Average: {hrAverage} bpm
          </Typography>
        </Grid>
        <Grid item xs>
          <CircularProgressWithLabel value={waterPercentage} />
          <Typography variant="h6" component="div" color="text.secondary">
            Water
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            Consumed: {waterConsumed} L
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            Remaining: {waterRemaining} L
          </Typography>
        </Grid>
        <Grid item xs>
          <CircularProgressWithLabel value={caloriesPercentage} />
          <Typography variant="h6" component="div" color="text.secondary">
            Calories
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            Consumed: {caloriesConsumed} kcal
          </Typography>
          <Typography variant="caption" component="div" color="text.secondary">
            Remaining: {caloriesRemaining} kcal
          </Typography>
        </Grid>
        <Button variant="outlined">Edit</Button>
      </Grid>
    </div>
  );
}
