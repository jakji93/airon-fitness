/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
// import MicIcon from '@mui/icons-material/Mic';
// import MicOffIcon from '@mui/icons-material/MicOff';
// import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
// import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
// import VoiceOverOffIcon from '@mui/icons-material/VoiceOverOff';
import {
  Box, Typography, Button,
} from '@mui/material';
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import voiceCommands from './VoiceCommands.json';

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

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleResetTranscript = () => {
    SpeechRecognition.resetTranscript();
  };

  return (
    <Box>
      <Typography>
        Transcript: {transcript}
      </Typography>
      <Button onClick={handleStartListening}> Start </Button>
      <Button onClick={handleStopListening}> Stop </Button>
      <Button onClick={handleResetTranscript}> Reset </Button>
    </Box>
    // <div style={{ paddingBottom: '25px' }}>
    //   <p>Transcript: {transcript}</p>
    //   <button onClick={handleStartListening}>Start</button>
    //   <button onClick={handleStopListening}>Stop</button>
    //   <button onClick={handleResetTranscript}>Reset</button>
    // </div>
  );
}
export default Dictaphone;
