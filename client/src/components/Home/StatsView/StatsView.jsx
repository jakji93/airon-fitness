import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExistingStatsView from './ExistingStatsView';
import NoStatsView from './NoStatsView';
import { getWorkoutAndMealSchedule, resetWorkoutAndMealScheduleStates } from '../../../reducers/WorkoutAndMealSchedule';

export default function StatsView() {
  const dispatch = useDispatch();
  const {
    workoutSchedule, mealSchedule, isError, isSuccess, message,
  } = useSelector((state) => state.workoutAndMealSchedule);
  const schedulesExist = workoutSchedule && mealSchedule
    && workoutSchedule.schedule && mealSchedule.schedule;
  useEffect(() => {
    if (!workoutSchedule || !mealSchedule) {
      dispatch(getWorkoutAndMealSchedule());
    }
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(resetWorkoutAndMealScheduleStates());
    }

    if (isSuccess) {
      dispatch(resetWorkoutAndMealScheduleStates());
    }
  }, [workoutSchedule, mealSchedule, isError, isSuccess, message, dispatch]);

  return (
    <div>
      {schedulesExist ? <ExistingStatsView /> : <NoStatsView />}
    </div>
  );
}
