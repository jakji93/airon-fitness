import SendIcon from '@mui/icons-material/Send';
import {
  Card, Grid, Divider, TextField, Fab, List, styled,
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
      <Grid container component={Card} sx={{ p: 1 }}>
        <Grid item>
          <MessageArea />
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item xs>
              <TextField id="outlined-basic-email" label="Type to request/update a plan" fullWidth />
            </Grid>
            <Grid item xs>
              <Fab color="primary" aria-label="add" fullWidth><SendIcon /></Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
