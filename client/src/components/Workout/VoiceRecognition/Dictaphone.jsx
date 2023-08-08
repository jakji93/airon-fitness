import InfoIcon from '@mui/icons-material/Info';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import {
  Box, IconButton, Tooltip,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import voiceCommands from './VoiceCommands.json';
import theme from '../../../theme';

function Dictaphone({
  timerToggle,
  incrementTimer,
  incrementTimerCustom,
  decrementTimerCustom,
  finishSet,
  pause,
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

      <Tooltip
        sx={{ color: theme.palette.secondary.main }}
        title={(
          <div>
            Command Phrases: <br />
            <br />
            {Object.entries(voiceCommands).map(([command, data]) => (
              <div key={command}>
                <strong>{data.description}</strong>: {data.phrases.join(', ')}
              </div>
            ))}
          </div>
)}
        aria-label="command phrases popover"
      >
        <IconButton disableFocusRipple disableTouchRipple>
          <InfoIcon />
        </IconButton>
      </Tooltip>

      { browserSupportsSpeechRecognition ? (
        <Tooltip
          title={(
            <div>
              Your browser supports voice recognition. <br />
              <br />
              Troubleshooting: <br />
              Voice control is not supported across all browsers. <br />
              The best native experience is on desktop Google Chrome. <br />
              Ensure that you give microphone permissions to AIRON.
            </div>
  )}
          sx={{ color: theme.palette.secondary.main }}
          aria-label="voice recognition popover"
        >
          <IconButton disableFocusRipple disableTouchRipple>
            <RecordVoiceOverIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip
          title={(
            <div>
              Your browser does not support voice recognition. <br />
              <br />
              Troubleshooting: <br />
              Voice control is not supported across all browsers. <br />
              The best native experience is on desktop Google Chrome. <br />
              Ensure that you give microphone permissions to AIRON.
            </div>
)}
          sx={{ color: theme.palette.secondary.main }}
          aria-label="voice recognition popover"
        >
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
            <br />
            {transcript}
          </div>
)}
        aria-label="speech transcript popover"
      >
        <IconButton disableFocusRipple disableTouchRipple>
          <SpeakerNotesIcon />
        </IconButton>
      </Tooltip>

      { listening ? (
        <Tooltip title="Your microphone is on" sx={{ color: theme.palette.secondary.main }} aria-label="microphone toggle">
          <IconButton onClick={handleStopListening} disableFocusRipple disableTouchRipple>
            <MicIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Your microphone is off" sx={{ color: theme.palette.secondary.main }} aria-label="microphone toggle">
          <IconButton onClick={handleStartListening} disableFocusRipple disableTouchRipple>
            <MicOffIcon>Voice Control Off</MicOffIcon>
          </IconButton>
        </Tooltip>
      )}

    </Box>

  );
}
export default Dictaphone;

Dictaphone.propTypes = {
  timerToggle: PropTypes.func.isRequired,
  incrementTimer: PropTypes.func.isRequired,
  incrementTimerCustom: PropTypes.func.isRequired,
  decrementTimerCustom: PropTypes.func.isRequired,
  finishSet: PropTypes.func.isRequired,
  pause: PropTypes.bool.isRequired,
};
