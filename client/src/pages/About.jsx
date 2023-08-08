/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Grid,
  Box,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';

import DavisSongIcon from '../assets/team/DavisSong.png';
import JackJiIcon from '../assets/team/JackJi.png';
import KennyChengIcon from '../assets/team/KennyCheng.png';
import KevinChungIcon from '../assets/team/KevinChung.png';
import KevinWuIcon from '../assets/team/KevinWu.png';
import theme from '../theme';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    maxWidth: 300,
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '10px',
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    marginBottom: '10px',
  },
  name: {
    marginBottom: '10px',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
  },
  icon: {
    color: theme.palette.secondary.light,
    fontSize: 20,
  },
};

const teamMembers = [
  {
    name: 'Davis Song',
    github: 'https://github.com/d-x-s',
    linkedIn: 'https://www.linkedin.com/in/davissong/',
    profilePicture: DavisSongIcon,
    contributions: 'Frontend Design & Styling, Guided Workouts, Data Generation Controllers',
  },
  {
    name: 'Jack Ji',
    github: 'https://github.com/jakji93',
    linkedIn: 'https://www.linkedin.com/in/jack-ji-5643a011a/',
    profilePicture: JackJiIcon,
    contributions: 'Database Design, Prompt Engineering, Deployments, Express Routing',
  },
  {
    name: 'Kenny Cheng',
    github: 'https://github.com/kennyjhcheng',
    linkedIn: 'https://www.linkedin.com/in/kennyjhcheng/',
    profilePicture: KennyChengIcon,
    contributions: 'Secure Authentication, Profile System, Redux Structure, Google Accounts',
  },
  {
    name: 'Kevin Chung',
    github: 'https://github.com/d-x-s',
    linkedIn: 'https://www.linkedin.com/in/kevin-chung07/',
    profilePicture: KevinChungIcon,
    contributions: 'Dashboard, Workout Statistics, Meal Plan Statistics Homepage Styling',
  },
  {
    name: 'Kevin Wu',
    github: 'https://github.com/kevin-wu01',
    linkedIn: 'https://www.linkedin.com/in/kevin-wu1/',
    profilePicture: KevinWuIcon,
    contributions: 'Chatbot, Schedule History, Signup Flows, OpenAI Integration',
  },
];

const textSize = 8;
const marginSize = 2;

function Margin() {
  return <Grid item sm={marginSize} xs={0} />;
}

function TeamMemberCard({
  name, linkedIn, github, profilePicture, contributions,
}) {
  return (
    <Paper style={styles.root}>

      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={profilePicture} alt={name} style={styles.profilePicture} />
      </Box>

      <Typography variant="h6" style={styles.name}>
        {name}
      </Typography>

      <Typography variant="h7" style={styles.name}>
        {contributions}
      </Typography>

      <div style={styles.iconContainer}>
        <IconButton
          color="primary"
          component="a"
          href={github}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon style={styles.icon} />
        </IconButton>
        <IconButton
          color="primary"
          component="a"
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon style={styles.icon} />
        </IconButton>
      </div>

    </Paper>
  );
}

export default function About() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5vh',
    }}
    >
      <Box sx={styles.sectionContainer}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '5rem',
            color: theme.palette.secondary.light,
            fontFamily: theme.typography.fontFamily,
            paddingTop: '2.5%',
          }}
        >
          The Team
        </Typography>

        <Box sx={{
          width: '90vw', flexWrap: 'wrap', paddingTop: '1%', paddingRight: '5%', paddingLeft: '5%', display: 'flex', gap: '2vw', justifyContent: 'center',
        }}
        >
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              linkedIn={member.linkedIn}
              github={member.github}
              profilePicture={member.profilePicture}
              contributions={member.contributions}
            />
          ))}
        </Box>
      </Box>

      <Box sx={styles.sectionContainer}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '5rem',
            color: theme.palette.secondary.light,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          About AIRON
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ p: 2 }}
          style={{
            height: '100%',
            width: '50vw',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Margin />
          <Grid item sm={textSize} xs={12}>
            <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
              Introducing AIron Fitness, your ultimate fitness companion,
              powered by cutting-edge artificial intelligence.
              Get ready to embark on a fitness journey like no other!
            </Typography>
          </Grid>
          <Margin /><Margin />
          <Grid item sm={textSize} xs={12}>
            <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
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
            <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
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
            <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
              Creating your profile is just the beginning.
              Input your fitness goals, and let AIron Fitness work its magic.
              You&apos;ll receive a comprehensive fitness plan,
              complete with guided workouts and a handy timer to keep you on track and motivated.
              It&apos;s like having your very own fitness coach available 24/7!
            </Typography>
          </Grid>
          <Margin /><Margin />
          <Grid item sm={textSize} xs={12}>
            <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
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
            <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
              With AIron Fitness, you&apos;re in control.
              Embrace a fitness journey that is uniquely yours,
              and experience the thrill of a personalized fitness adventure.
              Are you ready to unleash the full potential of your fitness goals?
              Let&apos;s conquer your fitness dreams together.
              Get started today and redefine what&apos;s possible!
            </Typography>
          </Grid>
          <Margin />
        </Grid>
      </Box>

      <Box sx={styles.sectionContainer}>
        <Typography
          variant="h2"
          sx={{
            fontSize: '5rem',
            color: theme.palette.secondary.light,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          Disclaimer
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ p: 2 }}
          style={{
            height: '100%',
            width: '50vw',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Margin />
          <Grid item sm={textSize} xs={12}>
            <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
              This fitness application is intended for general informational purposes
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
          <Margin /><Margin />
        </Grid>
      </Box>
    </Box>
  );
}
