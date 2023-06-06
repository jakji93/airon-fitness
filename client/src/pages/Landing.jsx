// import { Typography } from '@mui/material';
import React from 'react';

// @ts-ignore
import videoBackground from '../assets/LandingVideoBackgroundCrop.mp4';

export default function Landing() {
  return (
    <div className="video-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <video
        src={videoBackground}
        autoPlay
        loop
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
}
