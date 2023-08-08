import {
  CssBaseline,
  Grid,
  Typography,
  Avatar,
  Link,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

import logo from '../assets/design/LogoTan.png';

const textSize = 8;
const marginSize = 2;

function Margin() {
  return <Grid item sm={marginSize} xs={0} />;
}

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
  ];

  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={2}
        sx={{ p: 2 }}
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2" gutterBottom sx={{ color: theme.palette.secondary.light }}>
            About Us
          </Typography>
        </Grid>
        <Margin />
        <Grid item sm={textSize} xs={12}>
          <Typography variant="body1" gutterBottom sx={{ color: theme.palette.secondary.main }}>
            Introducing AIron Fitness, your ultimate fitness companion,
            powered by cutting-edge artificial intelligence.
            Get ready to embark on a fitness journey like no other!
          </Typography>
        </Grid>
        <Margin /><Margin />
        <Grid item sm={textSize} xs={12}>
          <Typography variant="body1" gutterBottom sx={{ color: theme.palette.secondary.main }}>
            AIron Fitness is more than just a fitness app;
            it&apos;s your personalized fitness guru,
            here to empower you every step of the way.
            We understand that every individual&apos;s fitness needs are unique,
            and that&apos;s why we&apos;ve harnessed the power of AI to craft
            personalized fitness plans that align perfectly with your goals and preferences.
          </Typography>
        </Grid>
        <Margin /><Margin />
        <Grid item sm={textSize} xs={12}>
          <Typography variant="body1" gutterBottom sx={{ color: theme.palette.secondary.main }}>
            Whether you&apos;re a fitness beginner,
            looking to take your first steps into a healthier lifestyle,
            or a seasoned enthusiast aiming to reach new heights,
            AIron Fitness has your back.
            Get ready to say goodbye to one-size-fits-all workouts
            and embrace a fitness solution that&apos;s tailor-made just for you.
          </Typography>
        </Grid>
        <Margin /><Margin />
        <Grid item sm={textSize} xs={12}>
          <Typography variant="body1" gutterBottom sx={{ color: theme.palette.secondary.main }}>
            Creating your profile is just the beginning.
            Input your fitness goals, and let AIron Fitness work its magic.
            You&apos;ll receive a comprehensive fitness plan,
            complete with guided workouts and a handy timer to keep you on track and motivated.
            It&apos;s like having your very own fitness coach available 24/7!
          </Typography>
        </Grid>
        <Margin /><Margin />
        <Grid item sm={textSize} xs={12}>
          <Typography variant="body1" gutterBottom sx={{ color: theme.palette.secondary.main }}>
            But that&apos;s not all,
            AIron Fitness goes beyond the surface.
            Our platform stores your valuable fitness data,
            including personal profiles and progress,
            allowing you to witness your achievements and growth over time.
            Celebrate your milestones and stay motivated as
            you witness the remarkable transformation you&apos;re capable of.
          </Typography>
        </Grid>
        <Margin /><Margin />
        <Grid item sm={textSize} xs={12}>
          <Typography variant="body1" gutterBottom sx={{ color: theme.palette.secondary.main }}>
            With AIron Fitness, you&apos;re in control.
            Embrace a fitness journey that is uniquely yours,
            and experience the thrill of a personalized fitness adventure.
            Are you ready to unleash the full potential of your fitness goals?
            Let&apos;s conquer your fitness dreams together.
            Get started today and redefine what&apos;s possible!
          </Typography>
        </Grid>
        <Margin />
        <Grid item xs={12} textAlign="center">
          <Typography variant="h2" gutterBottom sx={{ color: theme.palette.secondary.light }}>
            Meet the Team
          </Typography>
        </Grid>
        {teamMembers.map((member) => (
          <Grid item sm={2.4} sx={6} key={member.name} align="center">
            <Avatar alt={member.name} src={member.profilePicture} />
            <Typography variant="h6" gutterBottom color={theme.palette.secondary.light}>
              {member.name}
            </Typography>
            <Link
              href={member.linkedIn}
              color={theme.palette.secondary.main}
            >
              LinkedIn Profile
            </Link>
          </Grid>
        ))}
        <Margin />
        <Grid item sm={textSize} xs={12}>
          <Typography variant="body2" gutterBottom sx={{ color: theme.palette.secondary.main }}>
            Disclaimer: This fitness application is intended for general informational purposes
            only. The content provided, including workouts, exercises, and nutritional guidance,
            is not intended to replace professional advice or personalized training.
            Always consult with a qualified fitness trainer, healthcare professional,
            or nutritionist before starting any new exercise or dietary program.
            Participating in physical activities involves inherent risks,
            and by using this application,
            you acknowledge and accept full responsibility for any
            potential consequences arising from its use.
            We are not liable for any injuries, damages,
            or losses resulting from the use of this application.
            Please use your best judgment and listen to your body during workouts.
            Results may vary, and individual fitness goals
            should be discussed with a certified fitness expert.
            By using this application, you agree to the
            terms and conditions outlined in this disclaimer.
          </Typography>
        </Grid>
        <Margin />
      </Grid>
    </>
  );
}
