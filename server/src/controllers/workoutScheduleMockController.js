const asyncHandler = require('express-async-handler');
const WorkoutSchema = require('../models/WorkoutScheduleModel');
const { workoutScheduleMock } = require('../mock/WorkoutScheduleMockData');

/**
 * @desc    use mock data to create workout schedule (NO OPENAI CALL)
 * @route   POST /mock/workoutSchedule
 * @access  Private
 */
const MOCKcreateWorkoutSchedule = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const workoutScheduleExists = await WorkoutSchema.findOne({ userInfoID: id });
  if (workoutScheduleExists) {
    res.status(400).json({ message: 'Workout schedule already exists' });
  }

  // const userProfile = await UserProfile.findOne({ userInfoID: id });

  // const userData = userUtil.generateUserObject(userProfile);
  // const generatedSchedule = await openAI.generateWorkoutSchedule(userData);

  /** Use a MOCK SCHEDULE */
  const mockSchedule = workoutScheduleMock;

  const workoutSchedule = await WorkoutSchema.create({
    userInfoID: id,
    schedule: mockSchedule,
    inputs: [],
  });

  if (workoutSchedule) {
    res.status(201).json({
      userInfoID: workoutSchedule.id,
      schedule: workoutSchedule.schedule,
      inputs: workoutSchedule.inputs,
    });
  } else {
    res.status(400).json({ message: 'invalid workout schedule data' });
  }
});

/**
 * @desc    use mock data to update workout schedule (NO OPENAI CALL)
 * @route   PUT /mock/workoutSchedule
 * @access  Private
 */
const MOCKupdateUserWorkoutScheduleByUserID = asyncHandler(async (req, res) => {
  const id = req.user._id;

  const workoutSchedule = await WorkoutSchema.findOne({ userInfoID: id });
  if (!workoutSchedule) {
    res.status(404).json({ message: 'Cannot update a workout schedule that does not exist' });
  }

  // const schedule = JSON.stringify(workoutSchedule.schedule);
  const updatedInputs = workoutSchedule.inputs;
  updatedInputs.push(req.body.customInput);

  // const userProfile = await UserProfile.findOne({ userInfoID: id });

  // const userData = userUtil.generateUserObject(userProfile);

  // const updatedWorkoutSchedule = await openAI.updateWorkoutSchedule(
  //   userData,
  //   updatedInputs,
  //   schedule,
  // );

  /** Use a MOCK SCHEDULE */
  const mockSchedule = workoutScheduleMock;

  workoutSchedule.schedule = mockSchedule;
  workoutSchedule.inputs = updatedInputs;
  const savedWorkoutSchedule = await workoutSchedule.save();

  if (savedWorkoutSchedule) {
    res.status(200).json({
      userInfoID: savedWorkoutSchedule.id,
      schedule: savedWorkoutSchedule.schedule,
      inputs: savedWorkoutSchedule.inputs,
    });
  }
});

module.exports = {
  MOCKcreateWorkoutSchedule,
  MOCKupdateUserWorkoutScheduleByUserID,
};
