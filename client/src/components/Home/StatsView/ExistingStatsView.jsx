import {
  Card, Grid, Typography,
} from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React from 'react';
import { useSelector } from 'react-redux';

function getFitnessMacro(fitnessSchedule) {
  const fData = [];
  Object.keys(fitnessSchedule).map((day) => {
    fData.push(fitnessSchedule[day].total_calories);
    return fData;
  });
  return fData;
}

function createFChartAxis(fMacro) {
  const fAxis = [];
  const day = 'Day ';
  let key = '';
  let counter = 0;
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < fMacro.length; i++) {
    counter = i + 1;
    key = day + counter;
    fAxis.push(key);
  }
  return fAxis;
}

function getMealMacro(mealSchedule) {
  const mData = [];
  Object.keys(mealSchedule).map((day) => {
    mData.push(mealSchedule[day].nutrition_totals);
    return mData;
  });
  return mData;
}

function createMChartAxis(mMacro) {
  const mAxis = [];
  const day = 'Day ';
  let key = '';
  let counter = 0;
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < mMacro.length; i++) {
    counter = i + 1;
    key = day + counter;
    mAxis.push(key);
  }
  return mAxis;
}

function createCalChartAxis(fAxis, mAxis) {
  return fAxis.length > mAxis.length ? fAxis : mAxis;
}

function getMealData(mMacro) {
  const res = [];
  const calArray = [];
  const proArray = [];
  const carbArray = [];
  const fatArray = [];
  /* eslint-disable-next-line no-plusplus */
  for (let i = 0; i < mMacro.length; i++) {
    calArray.push(mMacro[i].calories);
    proArray.push(mMacro[i].protein);
    carbArray.push(mMacro[i].carbohydrates);
    fatArray.push(mMacro[i].fat);
  }
  res.push(calArray);
  res.push(proArray);
  res.push(carbArray);
  res.push(fatArray);
  return res;
}

function getCalData(fData, mData) {
  const res = [];
  if (fData.length < mData.length) {
    while (fData.length !== mData.length) {
      fData.push(0);
    }
  } else if (fData.length > mData.length) {
    while (fData.length !== mData.length) {
      mData.push(0);
    }
  }
  res.push(fData);
  res.push(mData);
  return res;
}

export default function ExistingStatsView() {
  const { workoutSchedule, mealSchedule } = useSelector(
    (state) => state.workoutAndMealSchedule,
  );

  const fSchedule = workoutSchedule.schedule;
  const mSchedule = mealSchedule.schedule;
  const fMacro = getFitnessMacro(fSchedule);
  const mMacro = getMealMacro(mSchedule);
  const fAxis = createFChartAxis(fMacro);
  const mAxis = createMChartAxis(mMacro);
  const calAxis = createCalChartAxis(fAxis, mAxis);
  const mData = getMealData(mMacro);
  const calData = getCalData(fMacro, mData[0]);

  return (
    <div>
      <Grid
        container
        component={Card}
        alignItems="center"
        justifyContent="center"
        sx={{
          p: 3,
          borderRadius: '10px',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
      >
        <Grid item xs="auto" sx={{ mb: 1 }}>
          <Typography variant="h6" component="div" color="text.secondary" sx={{ mb: -2 }}>
            Fitness & Meal Plans Calories
          </Typography>
          <BarChart
            legend={{ direction: 'column' }}
            xAxis={[{ scaleType: 'band', data: calAxis }]}
            series={[
              { data: calData[0], label: 'Calories burned [kcal]', color: '#F67280' },
              { data: calData[1], label: 'Calories consumed [kcal]', color: '#80E8CA' },
            ]}
            width={400}
            height={300}
          />
        </Grid>
        <Grid item xs="auto" sx={{ mb: 1 }}>
          <Typography variant="h6" component="div" color="text.secondary" sx={{ mb: -5 }}>
            Macronutrients
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: mAxis }]}
            series={[
              { data: mData[1], label: 'Protein [g]', color: '#C06C84' },
              { data: mData[2], label: 'Carbs [g]', color: '#84C06C' },
              { data: mData[3], label: 'Fat [g]', color: '#6C84C0' },
            ]}
            width={400}
            height={300}
          />
        </Grid>
      </Grid>
    </div>
  );
}
