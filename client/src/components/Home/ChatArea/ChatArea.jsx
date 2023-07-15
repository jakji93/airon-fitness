import SendIcon from '@mui/icons-material/Send';
import {
  Card, Grid, Divider, TextField, Typography, Fab,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import ChatMessages from './ChatMessages';
import { createFitnessPlan, fetchFitnessPlan } from '../../../actionCreators/FitnessPlan';
import {
  allergiesIntolerancesOptions,
  dietaryRestrictionsOptions,
  healthConditionsAndInjuriesOptions,
  weeklyAvailabilityOptions,
} from '../../../constants/AdditionalProfile';
import { goalsOptions } from '../../../constants/BasicProfile';
import FormMultiSelect from '../../Profile/Forms/FormMultiSelect';
import FormSelect from '../../Profile/Forms/FormSelect';

// const MessageArea = styled(List)(({ theme }) => ({
//   width: '30vw',
//   height: '30vh',
//   overflowY: 'auto',
//   margin: `0 auto ${theme.spacing(2)}px`,
// }));

// const styles = {
//   textbox: {
//     flex: '1 1 auto',
//     overflow: 'auto',
//     width: '100%',
//     height: '30vh',
//   },
//   message: {
//     overflow: 'auto',
//     margin: '4px 0',
//   },
//   content: {
//     display: 'inline-block',
//     maxWidth: '46%',
//     fontSize: '12px',
//     borderRadius: '15px',
//     padding: '8px 10px',
//     float: 'right',
//     textAlign: 'right',
//     color: 'white',
//     backgroundColor: '#00b2ff',
//   },
// };

export default function ChatArea() {
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = useState([{ content: 'Welcome to AI-ron Fitness! How can I help you?', isSelf: false }]);
  // eslint-disable-next-line no-unused-vars
  const [textField, setTextField] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [inputMode, setInputMode] = useState(1);
  // const [inputField, setInputField] = useState('');
  const [mode, setMode] = useState('starter');
  // const editProfileFields = ['weight', 'height', 'avaiability'];
  const [formSelect, setFormSelect] = useState('');
  const [inputMultiSelect, setInputMultiSelect] = useState([]);
  const [formOptions, setFormOptions] = useState(['Edit Profile', 'View Meal Plan', 'View Workout Plan']);
  const [inputLabel, setInputLabel] = useState('Choose an option');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createFitnessPlan());
  }, [dispatch]);

  // const stringContainsAny = (string, array) => {
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i < array.length; i++) {
  //     if (string.includes(array[i])) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

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
    }
  };

  const handleEditResponse = (newMessages, input) => {
    // update profile
    console.log(newMessages);
    console.log(input);
    const updateField = newMessages[newMessages.length - 1].content;
    let responseMsg;

    switch (updateField) {
      case 'Height':
        setInputMode(0);
        responseMsg = { content: 'Please provide a height in cm', isSelf: false };
        break;
      case 'Weight':
        setInputMode(0);
        responseMsg = { content: 'Please provide a weight in cm', isSelf: false };
        break;
      case 'Avaibility':
        setInputMode(1);
        setFormOptions(weeklyAvailabilityOptions);
        setInputLabel('Avaibility');
        responseMsg = { content: 'Please choose the number of days you are available', isSelf: false };
        break;
      case 'Allergies':
        setInputMode(2);
        setInputLabel('Allergies');
        setFormOptions(allergiesIntolerancesOptions);
        responseMsg = { content: 'Please select the relevant allergies', isSelf: false };
        break;
      case 'Health Conditions':
        setInputMode(2);
        setInputLabel('Health Conditions');
        setFormOptions(healthConditionsAndInjuriesOptions);
        responseMsg = { content: 'Please select the relevant health conditions', isSelf: false };
        break;
      case 'Dietary Restrictions':
        setInputMode(2);
        setInputLabel('Dietary Restrictions');
        setFormOptions(dietaryRestrictionsOptions);
        responseMsg = { content: 'Please select the relevant dietary restrictions', isSelf: false };
        break;
      case 'Goals':
        setInputMode(2);
        setInputLabel('Goals');
        setFormOptions(goalsOptions);
        responseMsg = { content: 'Please select your new goals', isSelf: false };
        break;
      default:
        responseMsg = { content: 'Sorry I don\'t understand, please try again', isSelf: false };
    }
    setMode('confirmEdit');

    newMessages.push(responseMsg);
  };

  const handleTextEdit = (newMessages, input) => {
    if (Number.isNaN(input)) {
      newMessages.push({ content: 'Please provide a valid number', isSelf: false });
    } else {
      newMessages.push({ content: 'Your profile has been updated', isSelf: false });
    }
  };

  const handleSelectEdit = (newMessages) => {
    newMessages.push({ content: 'Your profile has been updated. Is there anything else I can help with?', isSelf: false });
    setFormOptions(['Edit Profile', 'View Meal Plan', 'View Workout Plan']);
    setMode('starter');
    setInputMode(1);
    setInputLabel('Choose an option');
  };

  const handleMultiSelectEdit = (newMessages) => {
    newMessages.push({ content: 'Your profile has been updated. Is there anything else I can help with?', isSelf: false });
  };

  const handleConfirmEditResponse = (newMessages, input) => {
    if (inputMode === 0) {
      handleTextEdit(newMessages, input);
    } else if (inputMode === 1) {
      handleSelectEdit(newMessages);
    } else {
      handleMultiSelectEdit(newMessages);
    }
  };

  const handleGeneratePlan = (newMessages, input = null) => {
    newMessages.push({ content: 'Give me a moment to get your plan', isSelf: false });
    console.log(input);
    if (newMessages[1].content.includes('Workout')) {
      dispatch(fetchFitnessPlan());
      console.log('workout');
    } else {
      console.log('meal');
    }
  };

  const handleConfirmCustomInput = (newMessages) => {
    if (formSelect === 'No') {
      handleGeneratePlan(newMessages);
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
        handleGeneratePlan(newMessages, input);
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
      console.log(e);
      const newMessages = [...messages, { content: value, isSelf: true }];
      handleCommand(newMessages, value);
      setMessages(newMessages);

      document.getElementById('chatbox-inputfield').value = '';
    }
  };

  const handleSendButton = () => {
    let message;
    // if (inputMode === 0) {
    //   message = document.getElementById('chatbox-inputfield').value;
    // } else {
    //   message = formSelect;
    // }
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
    console.log(document.getElementById('chatbox-inputfield'));
  };

  const handleFieldChange = (e) => {
    setTextField(e.target.value);
  };

  // useEffect(() => {
  //   setInputMode(1);
  // }, []);

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
                ? <TextField id="chatbox-inputfield" label="Type to request/update a plan" onChange={handleFieldChange} onKeyDown={handleSubmit} fullWidth />
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
