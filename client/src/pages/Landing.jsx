import { Button, Typography } from '@mui/material';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';

import videoBackground from '../assets/LandingVideoBackgroundCrop.mp4';

const styles = {
  container: {
    flexDirection: 'column',
    height: '100vh',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000aa', // last two hex digits represent % opacity
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  actionContainer: {
    fontFamily: 'Montserrat, sans-serif',
    position: 'absolute',
    top: '25%',
    display: 'flex',
    flexDirection: 'column',
    padding: '25px 50px 25px 75px',
    zIndex: 9999,
  },
  typewriter: {
    color: '#F3F3F0',
    fontWeight: 800,
    fontSize: '60px',
  },
  info: {
    color: '#F3F3F0',
    fontSize: '20px',
    padding: '15px 15px 0px 0px',
  },
  actionButton: {
    color: '#B5936B',
    borderColor: '#B5936B',
    marginTop: '25px',
    padding: '15px',
    width: '200px',
  },
};

export default function Landing() {
  return (
    <div className="video-container" style={styles.container}>
      <div className="overlay" style={styles.overlay} />
      <div className="action-container" style={styles.actionContainer}>
        <div className="typewriter-container">
          <div className="typewriter" style={styles.typewriter}>
            <TypewriterComponent
              options={{
                strings: [
                  'I want to get in shape.',
                  'I want to achieve my weight loss goals.',
                  'I want to lose fat and build muscle.',
                  'I want to transform my body.',
                  'I want a healthier lifestyle.',
                  'I want to take control of my health.',
                  'I want to unlock my full potential.',
                  'I want to see amazing results.',
                ],
                autoStart: true,
                loop: true,
                delay: 40,
                deleteSpeed: 10,
              }}
            />
          </div>
        </div>
        <div className="info" style={styles.info}>
          <Typography variant="body1">
            AIron Fitness is an innovative AI trainer
            designed to support individuals on their workout journey.
          </Typography>
        </div>
        <Button variant="outlined" fontWeight="light" style={styles.actionButton}>
          Let&apos;s get started.
        </Button>
      </div>
      <video
        src={videoBackground}
        autoPlay
        loop
        muted
        style={styles.video}
      />
    </div>
  );
}
