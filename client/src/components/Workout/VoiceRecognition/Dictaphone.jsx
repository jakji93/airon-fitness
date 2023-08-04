/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Dictaphone({ timerToggle, incrementTimer, finishSet }) {
  const [message, setMessage] = useState('');
  const commands = [
    {
      command: 'Start Timer',
      callback: () => timerToggle(),
    },
    {
      command: 'Pause Timer',
      callback: () => timerToggle(),
    },
    {
      command: 'Add to timer',
      callback: () => incrementTimer,
    },
    {
      command: 'Finish set',
      callback: () => finishSet,
    },
    {
      command: 'The weather is :condition today',
      callback: (condition) => setMessage(`Today, the weather is ${condition}`),
    },
    {
      command: 'My top sports are * and *',
      callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`),
    },
    {
      command: 'Pass the salt (please)',
      callback: () => setMessage('My pleasure'),
    },
    {
      command: ['Hello', 'Hi'],
      callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
      matchInterim: true,
    },
    {
      command: 'Beijing',
      callback: (command, spokenPhrase, similarityRatio) => setMessage(`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
      // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
    },
    {
      command: ['eat', 'sleep', 'leave'],
      callback: (command) => setMessage(`Best matching command: ${command}`),
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2,
      bestMatchOnly: true,
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
    // Call the startListening function when the button is clicked
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    // Call the stopListening function when the button is clicked
    SpeechRecognition.stopListening();
  };

  const handleResetTranscript = () => {
    // Call the resetTranscript function when the button is clicked
    SpeechRecognition.resetTranscript();
  };

  return (
    <div style={{ paddingBottom: '25px' }}>
      <p>Response: {message}</p>
      <p>Transcript: {transcript}</p>
      <button onClick={handleStartListening}>Start</button>
      <button onClick={handleStopListening}>Stop</button>
      <button onClick={handleResetTranscript}>Reset</button>
    </div>
  );
}
export default Dictaphone;

// /* eslint-disable react/button-has-type */
// import React, { useState } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// function Dictaphone() {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   const [message, setMessage] = useState('');
//   const commands = [
//     {
//       command: 'I would like to order *',
//       callback: (food) => setMessage(`Your order is for: ${food}`),
//     },
//     {
//       command: 'The weather is :condition today',
//       callback: (condition) => setMessage(`Today, the weather is ${condition}`),
//     },
//     {
//       command: 'My top sports are * and *',
//       callback: (sport1, sport2) => setMessage(`#1: ${sport1}, #2: ${sport2}`),
//     },
//     {
//       command: 'Pass the salt (please)',
//       callback: () => setMessage('My pleasure'),
//     },
//     {
//       command: ['Hello', 'Hi'],
//       callback: ({ command }) => setMessage(`Hi there! You said: "${command}"`),
//       matchInterim: true,
//     },
//     {
//       command: 'Beijing',
//       callback: (command, spokenPhrase,
// similarityRatio) => setMessage
// (`${command} and ${spokenPhrase} are ${similarityRatio * 100}% similar`),
//       // If the spokenPhrase is "Benji", the message would be "Beijing and Benji are 40% similar"
//       isFuzzyMatch: true,
//       fuzzyMatchingThreshold: 0.2,
//     },
//     {
//       command: ['eat', 'sleep', 'leave'],
//       callback: (command) => setMessage(`Best matching command: ${command}`),
//       isFuzzyMatch: true,
//       fuzzyMatchingThreshold: 0.2,
//       bestMatchOnly: true,
//     },
//   ];

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesnt support speech recognition.</span>;
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? 'on' : 'off'}</p>
//       <button onClick={() => SpeechRecognition.startListening({ commands })}>Start
//       </button>
//       <button onClick={SpeechRecognition.stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>Message: {message}</p>
//       <p>{transcript}</p>
//     </div>
//   );
// }
// export default Dictaphone;
