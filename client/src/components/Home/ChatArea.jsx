import SendIcon from '@mui/icons-material/Send';
import {
  Card, Grid, Divider, TextField, Typography, Fab, List, styled,
} from '@mui/material';
import React from 'react';

const MessageArea = styled(List)(({ theme }) => ({
  width: '30vw',
  height: '30vh',
  overflowY: 'auto',
  margin: `0 auto ${theme.spacing(2)}px`,
}));

export default function ChatArea() {
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h5" className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Card}>
        <Grid item>
          <MessageArea />
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
