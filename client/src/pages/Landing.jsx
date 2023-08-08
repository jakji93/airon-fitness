import { Button, Typography } from '@mui/material';
import React from 'react';
import TypewriterComponent from 'typewriter-effect';

import banner from '../assets/design/GradientLogo1.png';
import videoBackground from '../assets/LandingVideoBackgroundCrop.mp4';
import theme from '../theme';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000aa',
  },
  banner: {
    paddingBottom: '2%',
    minWidth: '250px',
    maxWidth: '50%',
    maxHeight: '50%',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  actionContainer: {
    width: '90%',
    fontFamily: theme.typography.fontFamily,
    position: 'absolute',
    top: '25%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '5vw',
    paddingRight: '2.5vw',
    zIndex: 9999,
  },
  typewriter: {
    width: '90%',
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.light,
    fontWeight: 800,
    fontSize: '4vw',
  },
  infoContainer: {
    padding: '15px 15px 0px 0px',
  },
  info: {
    color: theme.palette.secondary.light,
    fontSize: 'clamp(12px, 1.5vw, 50px)',
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
  },
  actionButton: {
    fontWeight: 'normal',
    color: theme.palette.secondary.light,
    borderColor: '#B5936B',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: '25px',
    padding: '15px',
    fontSize: 'clamp(10px, 0.75vw, 50px)',
    width: 'clamp(150px, 15vw, 1000px)',
    '&:hover': {
      fontWeight: 'bolder',
      color: theme.palette.secondary.dark,
      borderColor: theme.palette.secondary.main,
      backgroundColor: theme.palette.secondary.main,
      transition: 'background-color 0.3s ease',
    },
  },
};

export default function Landing() {
  return (
    <div className="video-container" style={styles.container}>
      <div className="overlay" style={styles.overlay} />
      <div className="action-container" style={styles.actionContainer}>
        <img alt="AIron Fitness Logo" style={styles.banner} src={banner} />
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
        <div className="info" style={styles.infoContainer}>
          <Typography variant="body1" style={styles.info}>
            AIron Fitness is an innovative AI trainer
            designed to support individuals on their workout journey.
          </Typography>
        </div>
        <div className="button-container" style={styles.buttonContainer}>
          <Button variant="outlined" sx={styles.actionButton} href="/login">
            Let&apos;s get started.
          </Button>
          <Button variant="outlined" sx={styles.actionButton} href="/about">
            Who are we?
          </Button>
        </div>
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
