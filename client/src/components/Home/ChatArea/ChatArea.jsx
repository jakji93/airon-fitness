import SendIcon from '@mui/icons-material/Send';
import {
  Card, Grid, Divider, TextField, Typography, Fab, Box,
} from '@mui/material';
import React from 'react';

import ChatBot from './ChatBot';

// const MessageArea = styled(List)(({ theme }) => ({
//   width: '30vw',
//   height: '30vh',
//   overflowY: 'auto',
//   margin: `0 auto ${theme.spacing(2)}px`,
// }));

const styles = {
  textbox: {
    flex: '1 1 auto',
    overflow: 'auto',
    width: '100%',
    height: '30vh',
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

export default function ChatArea() {
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5" className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Card}>
        <Grid item style={{ width: '100%' }}>
          <ChatBot />
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Type to request/update a plan" fullWidth />
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
