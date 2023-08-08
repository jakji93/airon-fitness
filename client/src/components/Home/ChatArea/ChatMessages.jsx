/* eslint-disable react/no-array-index-key */
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import ChatBubble from './ChatBubble';
import theme from '../../../theme';

const styles = {
  textbox: {
    flex: '1 1 auto',
    overflow: 'auto',
    height: '30vh',
    padding: '0 20px',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: '10px',
    margin: '0 20px',
  },
  message: {
    overflow: 'auto',
    margin: '4px 0',
  },
  content: {
    display: 'inline-block',
    maxWidth: '46%',
    fontSize: '12px',
    borderRadius: '15px',
    padding: '8px 10px',
    float: 'right',
    textAlign: 'right',
    color: 'white',
    backgroundColor: '#00b2ff',
  },
};

export default function ChatMessages({ messages }) {
  return (
    <Box id="chatbox-messages" style={styles.textbox}>
      {messages.map((m, idx) => (
        <Box style={styles.message} key={idx}>
          <ChatBubble message={m} />
        </Box>
      ))}
    </Box>
  );
}

ChatMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string.isRequired,
    isSelf: PropTypes.bool.isRequired,
  })).isRequired,
};
