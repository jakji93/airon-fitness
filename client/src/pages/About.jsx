import { Grid, Typography, Avatar } from '@mui/material';
import React from 'react';

import logo from '../assets/design/LogoTan.png';

export default function About() {
  const teamMembers = [
    {
      name: 'Davis Song',
      linkedIn: 'https://www.linkedin.com/in/davissong/',
      profilePicture: logo, // Replace with the actual image URL
    },
    {
      name: 'Jack Ji',
      linkedIn: 'https://www.linkedin.com/in/jack-ji-5643a011a/',
      profilePicture: logo, // Replace with the actual image URL
    },
    {
      name: 'Kenny Cheng',
      linkedIn: 'https://www.linkedin.com/in/kennyjhcheng/',
      profilePicture: logo, // Replace with the actual image URL
    },
    {
      name: 'Kevin Chung',
      linkedIn: 'https://www.linkedin.com/in/kevin-chung07/',
      profilePicture: logo, // Replace with the actual image URL
    },
    {
      name: 'Kevin Wu',
      linkedIn: 'https://www.linkedin.com/in/kevin-wu1/',
      profilePicture: logo, // Replace with the actual image URL
    },
    // Add more team members here
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>
          About Us
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          Introducing AIron Fitness, your ultimate fitness companion,
          powered by cutting-edge artificial intelligence.
          Get ready to embark on a fitness journey like no other!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          AIron Fitness is more than just a fitness app;
          it&apos;s your personalized fitness guru,
          here to empower you every step of the way.
          We understand that every individual&apos;s fitness needs are unique,
          and that&apos;s why we&apos;ve harnessed the power of AI to craft
          personalized fitness plans that align perfectly with your goals and preferences.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          Whether you&apos;re a fitness beginner,
          looking to take your first steps into a healthier lifestyle,
          or a seasoned enthusiast aiming to reach new heights,
          AIron Fitness has your back.
          Get ready to say goodbye to one-size-fits-all workouts
          and embrace a fitness solution that&apos;s tailor-made just for you.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          Creating your profile is just the beginning.
          Input your fitness goals, and let AIron Fitness work its magic.
          You&apos;ll receive a comprehensive fitness plan,
          complete with guided workouts and a handy timer to keep you on track and motivated.
          It&apos;s like having your very own fitness coach available 24/7!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          But that&apos;s not all,
          AIron Fitness goes beyond the surface.
          Our platform stores your valuable fitness data,
          including personal profiles and progress,
          allowing you to witness your achievements and growth over time.
          Celebrate your milestones and stay motivated as
          you witness the remarkable transformation you&apos;re capable of.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom>
          With AIron Fitness, you&apos;re in control.
          Embrace a fitness journey that is uniquely yours,
          and experience the thrill of a personalized fitness adventure.
          Are you ready to unleash the full potential of your fitness goals?
          Let&apos;s conquer your fitness dreams together.
          Get started today and redefine what&apos;s possible!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>
          Meet the Team
        </Typography>
      </Grid>
      {teamMembers.map((member) => (
        <Grid item xs={2} key={member.name}>
          <Avatar alt={member.name} src={member.profilePicture} />
          <Typography variant="h6" gutterBottom>
            {member.name}
          </Typography>
          <Typography variant="body1">
            <a href={member.linkedIn} target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
