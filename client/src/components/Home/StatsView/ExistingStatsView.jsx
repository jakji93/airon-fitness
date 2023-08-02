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
  const mData = getMealData(mMacro);

  return (
    <div>
      <Grid container component={Card} alignItems="center" justifyContent="center" sx={{ p: 3 }}>
        <Grid item>
          <Typography variant="h6" component="div" color="text.secondary">
            Fitness Plan
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: fAxis }]}
            series={[{ data: fMacro, label: 'Calories burned [kcal]', color: '#355C7D' }]}
            width={400}
            height={250}
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" component="div" color="text.secondary">
            Meal Plan
          </Typography>
          <BarChart
            xAxis={[{ scaleType: 'band', data: mAxis }]}
            series={[
              { data: mData[0], label: 'Cal [kcal]', color: '#355C7D' },
              { data: mData[1], label: 'Protein [g]', color: '#6C5B7B' },
              { data: mData[2], label: 'Carbs [g]', color: '#C06C84' },
              { data: mData[3], label: 'Fat [g]', color: '#F67280' },
            ]}
            width={400}
            height={300}
          />
        </Grid>
      </Grid>
    </div>
  );
}
