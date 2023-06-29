import { Box } from '@mui/material';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Chatbot from 'react-chatbot-kit';

import ActionProvider from './ActionProvider';
import config from './config';
import MessageParser from './MessageParser';

export default function ChatBot() {
  return (
    <Box>
      <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
    </Box>
  );
}
