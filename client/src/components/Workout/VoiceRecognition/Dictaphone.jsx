/* eslint-disable react/prop-types */
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import {
  Box, IconButton, Tooltip,
} from '@mui/material';
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import voiceCommands from './VoiceCommands.json';
import theme from '../../../theme';

// command (String or String Array) -> the string/phrase(s) you are listening for
// callback (Function)              -> the function that is executed for a given command
// matchInterim (Boolean)           -> determines if interim results should be matched
// isFuzzyMatch (Boolean)           -> matches on % similarity instead of exact words
// fuzzyMatchingThreshold (Number)  -> 0 (matches anything) to 1 (exact match) with default 0.8
// bestMatchOnly (Boolean)          -> trigger callbacks when command phrase best matches speech
function Dictaphone({
  timerToggle, incrementTimer, incrementTimerCustom, decrementTimerCustom, finishSet, pause,
}) {
  const commands = [
    {
      command: voiceCommands.startTimer.phrases,
      callback: () => {
        if (pause) {
          timerToggle();
        }
      },
    },
    {
      command: voiceCommands.pauseTimer.phrases,
      callback: () => {
        if (!pause) {
          timerToggle();
        }
      },
    },
    {
      command: voiceCommands.addTime.phrases,
      callback: () => incrementTimer(),
    },
    {
      command: voiceCommands.addTimeCustom.phrases,
      callback: (s) => incrementTimerCustom(parseInt(s, 10)),
    },
    {
      command: voiceCommands.subtractTimeCustom.phrases,
      callback: (s) => decrementTimerCustom(parseInt(s, 10)),
    },
    {
      command: voiceCommands.finishSet.phrases,
      callback: () => finishSet(),
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <Box sx={{ display: 'flex' }}>

      { browserSupportsSpeechRecognition ? (
        <Tooltip title="Your browser supports voice recognition" sx={{ color: theme.palette.secondary.main }}>
          <IconButton disableFocusRipple disableTouchRipple>
            <RecordVoiceOverIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Your browser does not support voice recognition" sx={{ color: theme.palette.secondary.main }}>
          <IconButton disableFocusRipple disableTouchRipple>
            <VoiceOverOffIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip
        sx={{ color: theme.palette.secondary.main }}
        title={(
          <div>
            Speech Transcript: <br />
            {transcript}
          </div>
      )}
      >
        <IconButton disableFocusRipple disableTouchRipple>
          <SpeakerNotesIcon />
        </IconButton>
      </Tooltip>

      { listening ? (
        <Tooltip title="Your microphone is on" sx={{ color: theme.palette.secondary.main }}>
          <IconButton disableFocusRipple disableTouchRipple>
            <MicIcon onClick={handleStopListening} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Your microphone is off" sx={{ color: theme.palette.secondary.main }}>
          <IconButton onClick={handleStartListening} disableFocusRipple disableTouchRipple>
            <MicOffIcon>Voice Control Off</MicOffIcon>
          </IconButton>
        </Tooltip>
      )}

    </Box>
  );
}
export default Dictaphone;
