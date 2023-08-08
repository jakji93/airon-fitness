import SendIcon from '@mui/icons-material/Send';
import {
  Grid, Divider, TextField, Fab,
} from '@mui/material';
import React, { useState, useEffect, useReducer } from 'react';
import { useDispatch, useStore } from 'react-redux';

import ChatMessages from './ChatMessages';
import {
  createWorkoutString, createMealString, starterOptions,
  starterLabel, checkExistingMeal, checkExistingWorkout,
} from './util';
import {
  allergiesIntolerancesOptions,
  dietaryRestrictionsOptions,
  healthConditionsAndInjuriesOptions,
  weeklyAvailabilityOptions,
} from '../../../constants/AdditionalProfile';
import { goalsOptions } from '../../../constants/BasicProfile';
import { getUserProfile, updateUserProfile } from '../../../reducers/UserProfile';
import {
  getWorkoutSchedule, getMealSchedule, updateWorkoutSchedule,
  updateMealSchedule, createWorkoutAndMealSchedule,
} from '../../../reducers/WorkoutAndMealSchedule';
import theme from '../../../theme';
import FormMultiSelect from '../../Profile/Forms/FormMultiSelect';
import FormSelect from '../../Profile/Forms/FormSelect';

export default function ChatArea() {
  const [messages, setMessages] = useState([{ content: 'Welcome to AIRON Fitness! How can I help you?', isSelf: false }]);
  const [inputMode, setInputMode] = useState(1);
  const [mode, setMode] = useState('starter');
  const [formSelect, setFormSelect] = useState('');
  const [inputMultiSelect, setInputMultiSelect] = useState([]);
  const [formOptions, setFormOptions] = useState(starterOptions.slice(0, 1));
  const [inputLabel, setInputLabel] = useState(starterLabel);
  const [profileEditField, setProfileEditField] = useState('');
  const [scheduleMode, setScheduleMode] = useState('');
  const [lock, setLock] = useState(false);
  const dispatch = useDispatch();
  const store = useStore();
  const [token, forceUpdate] = useReducer((x) => x + 1, 0);

  const resetValues = () => {
    const state = store.getState();

    setProfileEditField('');
    setInputLabel(starterLabel);
    setInputMultiSelect([]);
    setFormSelect('');
    setInputMode(1);
    setMode('starter');

    if (!state.workoutAndMealSchedule.workoutSchedule
      && !state.workoutAndMealSchedule.workoutSchedule) {
      setFormOptions(starterOptions.slice(0, 2));
    } else {
      setFormOptions(starterOptions.slice(0, 1).concat(starterOptions.slice(2)));
    }
  };

  useEffect(() => {
    const chatBox = document.getElementById('chatbox-messages');

    chatBox.scrollTop = chatBox.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const chatBox = document.getElementById('chatbox-messages');

    chatBox.scrollTop = chatBox.scrollHeight;
  }, [token]);

  useEffect(() => {
    resetValues();
  }, []);

  const validateExistingSchedule = (validateMode) => {
    const state = store.getState();
    let error;

    if (validateMode) {
      error = state.workoutAndMealSchedule.workoutSchedule;
    } else {
      error = state.workoutAndMealSchedule.mealSchedule;
    }

    if (error === undefined || Object.keys(error).length === 0) throw new Error('No existing schedule');
  };

  const generatePlan = async (newMessages, call, customInput) => {
    let state = store.getState();
    setLock(true);

    try {
      switch (call) {
        case 'new':
          await dispatch(scheduleMode === 'Workout' ? checkExistingWorkout(state) : checkExistingMeal(state));
          break;
        case 'curr':
          validateExistingSchedule(scheduleMode === 'Workout');
          await dispatch(scheduleMode === 'Workout' ? getWorkoutSchedule() : getMealSchedule());
          break;
        case 'custom':
          validateExistingSchedule(scheduleMode === 'Workout');
          await dispatch(scheduleMode === 'Workout' ? updateWorkoutSchedule(customInput) : updateMealSchedule(customInput));
          break;
        default:
      }
    } catch (e) {
      throw new Error('No existing schedule');
    } finally {
      setLock(false);
    }

    state = store.getState();
    let schedule;

    if (scheduleMode === 'Workout') {
      schedule = state.workoutAndMealSchedule.workoutSchedule.schedule;
      createWorkoutString(schedule, newMessages);
    } else {
      schedule = state.workoutAndMealSchedule.mealSchedule;
      createMealString(schedule, newMessages);
    }

    newMessages.push({ content: 'Is there anything else I can help with?', isSelf: false });
    setMessages(newMessages);
    resetValues();
    forceUpdate();
  };

  const handleStarterResponse = async (newMessages, input) => {
    if (input === 'Edit Profile') {
      newMessages.push({ content: 'For sure. Which of the following values would you like to update?', isSelf: false });
      setFormOptions(['Height', 'Weight', 'Avaibility', 'Allergies', 'Health Conditions', 'Dietary Restrictions', 'Goals']);
      setInputMode(1);
      setInputLabel('Profile');
      setMode('edit');
    } else if (input === 'Generate Schedules') {
      newMessages.push({ content: 'Give me one a moment to generate your schedules', isSelf: false });
      await dispatch(createWorkoutAndMealSchedule());
      newMessages.push({ content: 'Your schedules have been generated. Please refer to the plans tile for details.', isSelf: false });
      newMessages.push({ content: 'Is there anything else I can help with?', isSelf: false });

      setMessages(newMessages);
      resetValues();
      forceUpdate();
    } else {
      newMessages.push({ content: `Would you like to update your ${input.slice(input.indexOf(' ') + 1)} with custom input?`, isSelf: false });
      setMode('confirmCustomInput');
      setFormOptions(['Yes', 'No']);
      setInputMode(1);
      setInputLabel('Provide custom input?');
      setScheduleMode(input.split(' ')[1]);
    }
  };

  const handleEditResponse = async (newMessages) => {
    const updateField = newMessages[newMessages.length - 1].content;
    let state = store.getState();
    let responseMsg;

    if (!state.userProfile.profile) {
      await dispatch(getUserProfile());
      state = store.getState();
    }

    switch (updateField) {
      case 'Height':
        setInputMode(0);
        setProfileEditField('height');
        responseMsg = { content: ` Please provide a height in ${state.userProfile.profile.heightUnit}`, isSelf: false };
        break;
      case 'Weight':
        setInputMode(0);
        setProfileEditField('weight');
        responseMsg = { content: `Please provide a weight in ${state.userProfile.profile.weightUnit}`, isSelf: false };
        break;
      case 'Availability':
        setInputMode(1);
        setFormOptions(weeklyAvailabilityOptions);
        setInputLabel('Availability');
        setProfileEditField('weeklyAvailability');
        responseMsg = { content: 'Please choose the number of days you are available', isSelf: false };
        break;
      case 'Allergies':
        setInputMode(2);
        setInputLabel('Allergies');
        setFormOptions(allergiesIntolerancesOptions);
        setProfileEditField('allergies');
        responseMsg = { content: 'Please select the relevant allergies', isSelf: false };
        break;
      case 'Health Conditions':
        setInputMode(2);
        setInputLabel('Health Conditions');
        setFormOptions(healthConditionsAndInjuriesOptions);
        setProfileEditField('healthConditions');
        responseMsg = { content: 'Please select the relevant health conditions', isSelf: false };
        break;
      case 'Dietary Restrictions':
        setInputMode(2);
        setInputLabel('Dietary Restrictions');
        setFormOptions(dietaryRestrictionsOptions);
        setProfileEditField('dietRestriction');
        responseMsg = { content: 'Please select the relevant dietary restrictions', isSelf: false };
        break;
      case 'Goals':
        setInputMode(2);
        setInputLabel('Goals');
        setFormOptions(goalsOptions);
        setProfileEditField('goals');
        responseMsg = { content: 'Please select your new goals', isSelf: false };
        break;
      default:
        responseMsg = { content: 'Sorry I don\'t understand, please try again', isSelf: false };
    }
    setMode('confirmEdit');

    newMessages.push(responseMsg);
  };

  const handleTextEdit = async (newMessages, input) => {
    if (Number.isNaN(input)) {
      newMessages.push({ content: 'Please provide a valid number', isSelf: false });
    } else {
      await dispatch(updateUserProfile({ [profileEditField]: input }));
      newMessages.push({ content: 'Your profile has been updated', isSelf: false });

      setMessages(newMessages);
      resetValues();
      forceUpdate();
    }
  };

  const handleSelectEdit = async (newMessages) => {
    await dispatch(updateUserProfile({
      [profileEditField]: inputMultiSelect.length === 0 ? formSelect : inputMultiSelect,
    }));
    newMessages.push({ content: 'Your profile has been updated. Is there anything else I can help with?', isSelf: false });

    setMessages(newMessages);
    resetValues();
    forceUpdate();
  };

  const handleConfirmEditResponse = (newMessages, input) => {
    if (inputMode === 0) {
      handleTextEdit(newMessages, input);
    } else {
      handleSelectEdit(newMessages);
    }
  };

  const handleConfirmCustomInput = async (newMessages) => {
    if (formSelect === 'No') {
      try {
        await generatePlan(newMessages, 'curr');
      } catch (e) {
        newMessages.push({ content: 'It appears you do not have a schedule, give me a moment to generate one for you', isSelf: false });
        generatePlan(newMessages, 'new');
      }
    } else {
      newMessages.push({ content: 'What custom input would you like to provide?', isSelf: false });
      setMode('generatePlanWithCustom');
      setInputMode(0);
    }
  };

  const handleCommand = async (newMessages, input) => {
    switch (mode) {
      case 'starter':
        handleStarterResponse(newMessages, input);
        break;
      case 'edit':
        handleEditResponse(newMessages, input);
        break;
      case 'generatePlanWithCustom':
        try {
          newMessages.push({ content: 'Please give me a moment to update your schedule', isSelf: false });
          await generatePlan(newMessages, 'custom', input);
        } catch (e) {
          newMessages.push({ content: 'It appears you do not have a schedule, give me a moment to generate one for you', isSelf: false });

          generatePlan(newMessages, 'new');
        }
        break;
      case 'confirmCustomInput':
        handleConfirmCustomInput(newMessages);
        break;
      case 'confirmEdit':
        handleConfirmEditResponse(newMessages, input);
        break;
      default:
        newMessages.push({ content: 'Sorry I don\'t understand, try asking me about your workout schedule.', isSelf: false });
    }
  };

  const handleSubmit = (e) => {
    const { value } = e.target;

    if (e.key === 'Enter' && value !== '' && !lock) {
      const newMessages = [...messages, { content: value, isSelf: true }];
      handleCommand(newMessages, value);
      setMessages(newMessages);

      document.getElementById('chatbox-inputfield').value = '';
    }
  };

  const handleSendButton = () => {
    let message;

    if (!lock) {
      switch (inputMode) {
        case 0:
          if (document.getElementById('chatbox-inputfield').value === '') return;
          message = document.getElementById('chatbox-inputfield').value;
          break;
        case 1:
          message = formSelect;
          break;
        case 2:
          inputMultiSelect.forEach((i, idx) => {
            message = idx === 0 ? i : `${message}, ${i}`;
          });
          break;
        default:
          return;
      }

      const newMessages = [...messages, { content: message, isSelf: true }];
      handleCommand(newMessages, message);
      setMessages(newMessages);
    }
  };

  return (
    <Grid
      container
      sx={{
        p: 1,
        pt: 3,
        borderRadius: '10px',
        border: `1px solid ${theme.palette.secondary.main}`,
        bgcolor: theme.palette.secondary.dark,
      }}
    >
      <Grid item style={{ width: '100%' }}>
        <ChatMessages messages={messages} />
        <Divider />
        <Grid container style={{ padding: '20px', alignItems: 'center', flexWrap: 'nowrap' }}>
          <Grid item xs={11}>
            { inputMode === 0
              ? <TextField id="chatbox-inputfield" label="Provide a valid value" onKeyDown={handleSubmit} fullWidth />
              : ''}
            {
                inputMode === 1
                  ? (
                    <FormSelect
                      label={inputLabel}
                      id="chatbox-inputfield"
                      showTitleLabel={false}
                      options={formOptions}
                      setValue={setFormSelect}
                      value={formSelect}
                      customTextFieldGridSize={12}
                      fillHeight
                    />
                  ) : ''
              }
            {
                inputMode === 2
                  ? (
                    <FormMultiSelect
                      label={inputLabel}
                      id="chatbox-inputfield"
                      showTitleLabel={false}
                      options={formOptions}
                      setValue={setInputMultiSelect}
                      value={inputMultiSelect}
                      customTextFieldGridSize={12}
                    />
                  ) : ''
              }
          </Grid>
          <Grid item style={{ marginLeft: '20px' }}>
            <Fab
              aria-label="add"
              onClick={handleSendButton}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.dark,
                '&:hover': {
                  backgroundColor: '#CC9F6B',
                },
              }}
            >
              <SendIcon sx={{ color: theme.palette.secondary.dark }} />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
