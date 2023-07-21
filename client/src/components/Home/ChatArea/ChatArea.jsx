import SendIcon from '@mui/icons-material/Send';
import {
  Card, Grid, Divider, TextField, Typography, Fab,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import ChatMessages from './ChatMessages';
import {
  allergiesIntolerancesOptions,
  dietaryRestrictionsOptions,
  healthConditionsAndInjuriesOptions,
  weeklyAvailabilityOptions,
} from '../../../constants/AdditionalProfile';
import { goalsOptions } from '../../../constants/BasicProfile';
import { getUserProfile, updateUserProfile } from '../../../reducers/UserProfile';
import {
  getWorkoutSchedule, getMealSchedule, createWorkoutSchedule,
  createMealSchedule, updateWorkoutSchedule, updateMealSchedule,
} from '../../../reducers/WorkoutAndMealSchedule';
import FormMultiSelect from '../../Profile/Forms/FormMultiSelect';
import FormSelect from '../../Profile/Forms/FormSelect';

const starterOptions = ['Edit Profile', 'View Meal Plan', 'View Workout Plan'];
const starterLabel = 'Choose an option';

export default function ChatArea() {
  const [messages, setMessages] = useState([{ content: 'Welcome to AI-ron Fitness! How can I help you?', isSelf: false }]);
  const [inputMode, setInputMode] = useState(1);
  const [mode, setMode] = useState('starter');
  const [formSelect, setFormSelect] = useState('');
  const [inputMultiSelect, setInputMultiSelect] = useState([]);
  const [formOptions, setFormOptions] = useState(starterOptions);
  const [inputLabel, setInputLabel] = useState(starterLabel);
  const [profileEditField, setProfileEditField] = useState('');
  const [scheduleMode, setScheduleMode] = useState('');
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    const chatBox = document.getElementById('chatbox-messages');

    chatBox.scrollTop = chatBox.scrollHeight;
  }, [messages]);

  const resetValues = () => {
    setProfileEditField('');
    setInputLabel(starterLabel);
    setInputMultiSelect([]);
    setFormSelect('');
    setInputMode(1);
    setMode('starter');
    setFormOptions(starterOptions);
  };

  const handleStarterResponse = (newMessages, input) => {
    if (input === 'Edit Profile') {
      newMessages.push({ content: 'For sure. Which of the following values would you like to update?', isSelf: false });
      setFormOptions(['Height', 'Weight', 'Avaibility', 'Allergies', 'Health Conditions', 'Dietary Restrictions', 'Goals']);
      setInputMode(1);
      setInputLabel('Profile');
      setMode('edit');
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
      case 'Avaibility':
        setInputMode(1);
        setFormOptions(weeklyAvailabilityOptions);
        setInputLabel('Avaibility');
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
      resetValues();
    }
  };

  const handleSelectEdit = async (newMessages) => {
    await dispatch(updateUserProfile({
      [profileEditField]: inputMultiSelect.length === 0 ? formSelect : inputMultiSelect,
    }));
    newMessages.push({ content: 'Your profile has been updated. Is there anything else I can help with?', isSelf: false });
    resetValues();
  };

  const handleConfirmEditResponse = (newMessages, input) => {
    if (inputMode === 0) {
      handleTextEdit(newMessages, input);
    } else {
      handleSelectEdit(newMessages);
    }
  };

  const createWorkoutString = (schedule, newMessages) => {
    Object.entries(schedule).forEach(([day, exercises]) => {
      let workoutString = '';
      const exercisesArray = Object.entries(exercises);
      let workout = `${day}\n`;

      exercisesArray.forEach((ex) => {
        workout += `Exercise ${Number(ex[0]) + 1}:  ${ex[1].exercise} ${ex[1].reps} Reps, ${ex[1].sets} Sets\n`;
      });

      workoutString += workout;
      newMessages.push({ content: workoutString, isSelf: false });
    });
  };

  const createMealString = (schedule, newMessages) => {
    Object.entries(schedule.schedule).forEach(([day, meals]) => {
      const meal = Object.entries(meals);
      newMessages.push({ content: `${day}\n`, isSelf: false });

      meal.forEach((ex, idx) => {
        newMessages.push({ content: idx !== 5 ? `${ex[0]}: ${ex[1]}\n` : '', isSelf: false });
      });
    });
  };

  const generatePlan = async (newMessages, call, customInput) => {
    switch (call) {
      case 'new':
        await dispatch(scheduleMode === 'Workout' ? createWorkoutSchedule() : createMealSchedule());
        break;
      case 'curr':
        await dispatch(scheduleMode === 'Workout' ? getWorkoutSchedule() : getMealSchedule());
        break;
      case 'custom':
        await dispatch(scheduleMode === 'Workout' ? updateWorkoutSchedule(customInput) : updateMealSchedule(customInput));
        break;
      default:
    }

    const state = store.getState();
    let schedule;

    if (state.workoutAndMealSchedule.isError) throw new Error('Create schedule failed');

    if (scheduleMode === 'Workout') {
      schedule = state.workoutAndMealSchedule.workoutSchedule.schedule;
      createWorkoutString(schedule, newMessages);
    } else {
      schedule = state.workoutAndMealSchedule.mealSchedule;
      createMealString(schedule, newMessages);
    }

    newMessages.push({ content: 'Is there anything else I can help with?', isSelf: false });
    resetValues();
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

  const handleCommand = (newMessages, input) => {
    switch (mode) {
      case 'starter':
        handleStarterResponse(newMessages, input);
        break;
      case 'edit':
        handleEditResponse(newMessages, input);
        break;
      case 'generatePlanWithCustom':
        generatePlan(newMessages, 'custom', input);
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

    if (e.key === 'Enter' && value !== '') {
      const newMessages = [...messages, { content: value, isSelf: true }];
      handleCommand(newMessages, value);
      setMessages(newMessages);

      document.getElementById('chatbox-inputfield').value = '';
    }
  };

  const handleSendButton = () => {
    let message;

    switch (inputMode) {
      case 0:
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
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5" className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Card}>
        <Grid item style={{ width: '100%' }}>
          <ChatMessages messages={messages} />
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              { inputMode === 0
                ? <TextField id="chatbox-inputfield" label="Type to request/update a plan" onKeyDown={handleSubmit} fullWidth />
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
                    />
                  ) : ''
              }
            </Grid>
            <Grid item xs={1}>
              <Fab color="primary" aria-label="add"><SendIcon onClick={handleSendButton} /></Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
