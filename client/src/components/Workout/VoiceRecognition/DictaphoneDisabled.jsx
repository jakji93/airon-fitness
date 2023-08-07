import InfoIcon from '@mui/icons-material/Info';
import MicOffIcon from '@mui/icons-material/MicOff';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import {
  Box, IconButton,
} from '@mui/material';
import React from 'react';

export default function DictaphoneDisabled() {
  return (
    <Box sx={{ display: 'flex' }}>

      <IconButton disabled>
        <InfoIcon />
      </IconButton>

      <IconButton disabled>
        <RecordVoiceOverIcon />
      </IconButton>

      <IconButton disabled>
        <SpeakerNotesIcon />
      </IconButton>

      <IconButton disabled>
        <MicOffIcon />
      </IconButton>
    </Box>
  );
}
