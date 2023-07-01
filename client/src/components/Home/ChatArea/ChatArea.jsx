import SendIcon from '@mui/icons-material/Send';
import {
  Card, Grid, Divider, TextField, Typography, Fab,
} from '@mui/material';
import React, { useState } from 'react';

import ChatMessages from './ChatMessages';

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
  const [textField, setTextField] = useState('');
  const [mode, setMode] = useState(0);
  const editProfileFields = ['weight', 'height', 'avaiability'];

  const stringContainsAny = (string, array) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < array.length; i++) {
      if (string.includes(array[i])) {
        return true;
      }
    }
    return false;
  };

  const handleModeZeroResponse = (newMessages) => {
    const userText = textField.toLowerCase();

    if (userText.includes('workout')) {
      newMessages.push({ content: 'Let\'s get the perfect workout schedule for you. One moment please.', isSelf: false });
      return;
    }

    if (userText.includes('meal')) {
      newMessages.push({ content: 'Let\'s get the perfect meal schedule for you. One moment please.', isSelf: false });
      return;
    }

    if (userText.includes('plan') || textField.includes('schedule')) {
      newMessages.push({ content: 'Would you like me to get your workout or meal schedule?', isSelf: false });
      setMode(2);
      return;
    }

    if (userText.includes('update') && textField.includes('profile')) {
      newMessages.push({ content: 'For sure. Which of the following values would you like to update: Weight, Height, Availability', isSelf: false });
      setMode(1);
      return;
    }

    newMessages.push({ content: 'Sorry I don\'t understand, try asking me about your workout schedule.', isSelf: false });
  };

  const handleModeOneResponse = (newMessages) => {
    const userText = textField.toLowerCase();

    if (mode === 1 && !stringContainsAny(userText, editProfileFields)) {
      newMessages.push({ content: 'Invalid profile field. Please provide a valid profile field to update.', isSelf: false });
      return;
    }

    newMessages.push({ content: 'Sorry I don\'t understand, try asking me about your workout schedule.', isSelf: false });
  };

  const handleModeTwoResponse = (newMessages) => {
    const userText = textField.toLowerCase();

    if (userText.includes('workout')) {
      newMessages.push({ content: 'Let\'s get the perfect workout schedule for you. One moment please.', isSelf: false });
      return;
    }

    if (userText.includes('meal')) {
      newMessages.push({ content: 'Let\'s get the perfect meal schedule for you. One moment please.', isSelf: false });
      return;
    }

    newMessages.push({ content: 'Sorry I don\'t understand, try asking me about your workout schedule.', isSelf: false });
  };

  const handleCommand = (newMessages) => {
    switch (mode) {
      case 0:
        handleModeZeroResponse(newMessages);
        break;
      case 1:
        handleModeOneResponse(newMessages);
        break;
      case 2:
        handleModeTwoResponse(newMessages);
        break;
      default:
        newMessages.push({ content: 'Sorry I don\'t understand, try asking me about your workout schedule.', isSelf: false });
    }
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter' && textField !== '') {
      const newMessages = [...messages, { content: textField, isSelf: true }];
      handleCommand(newMessages);
      setMessages(newMessages);

      setTextField('');
    }
  };

  const handleFieldChange = (e) => {
    setTextField(e.target.value);
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
              <TextField value={textField} id="outlined-basic-email" label="Type to request/update a plan" onChange={handleFieldChange} onKeyDown={handleSubmit} fullWidth />
            </Grid>
            <Grid item xs={1}>
              <Fab color="primary" aria-label="add"><SendIcon /></Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
