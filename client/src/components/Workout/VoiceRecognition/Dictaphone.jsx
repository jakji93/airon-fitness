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

// command (String or String Array) -> the string/phrase(s) you are listening for
// callback (Function)              -> the function that is executed for a given command
// matchInterim (Boolean)           -> determines if interim results should be matched
// isFuzzyMatch (Boolean)           -> matches on % similarity instead of exact words
// fuzzyMatchingThreshold (Number)  -> 0 (matches anything) to 1 (exact match) with default 0.8
// bestMatchOnly (Boolean)          -> trigger callbacks when command phrase best matches speech
function Dictaphone({
  timerToggle,
  incrementTimer,
  incrementTimerCustom,
  decrementTimerCustom,
  finishSet,
  pause,
  slideIsInView,
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
    <Box>
      {slideIsInView ? (
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
      ) : (
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
  slideIsInView: PropTypes.bool.isRequired,
};
