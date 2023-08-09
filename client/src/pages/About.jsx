/* eslint-disable react/prop-types */
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import HttpsIcon from '@mui/icons-material/Https';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import StorageIcon from '@mui/icons-material/Storage';
import {
  CssBaseline,
  Grid,
  Box,
  IconButton,
  Paper,
  Typography,
  Dialog,
} from '@mui/material';
import React, { useState } from 'react';

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
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      transition: 'background-color 0.5s ease-in-out',
    },
  },
  featureCardPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    minWidth: 200,
    minHeight: 200,
    maxWidth: 300,
    width: '7.5vw',
    height: '7.5vw',
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      transition: 'background-color 0.5s ease',
      cursor: 'pointer',
    },
  },
  popupContent: {
    padding: '2rem',
    display: 'flex',
    width: 'calc(250px + 10vw)',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.dark,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
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
    border: '5px solid',
    borderColor: theme.palette.secondary.light,
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
    color: theme.palette.secondary.dark,
    fontSize: 20,
  },
};

const textSize = 8;
const marginSize = 2;

function Margin() {
  return <Grid item sm={marginSize} xs={0} />;
}

const teamMembers = [
  {
    name: 'Davis Song',
    github: 'https://github.com/d-x-s',
    linkedIn: 'https://www.linkedin.com/in/davissong/',
    profilePicture: DavisSongIcon,
    contributions: 'OpenAI Data Generation, Database Integration, Voice Workouts, FE Design',
  },
  {
    name: 'Jack Ji',
    github: 'https://github.com/jakji93',
    linkedIn: 'https://www.linkedin.com/in/jack-ji-5643a011a/',
    profilePicture: JackJiIcon,
    contributions: 'Database Design, Prompt Engineering, Express Routing, Deployments',
  },
  {
    name: 'Kenny Cheng',
    github: 'https://github.com/kennyjhcheng',
    linkedIn: 'https://www.linkedin.com/in/kennyjhcheng/',
    profilePicture: KennyChengIcon,
    contributions: 'Authentication, Reusable Form, Signup, Redux, Google Login, Accessibility',
  },
  {
    name: 'Kevin Chung',
    github: 'https://github.com/ckev07',
    linkedIn: 'https://www.linkedin.com/in/kevin-chung07/',
    profilePicture: KevinChungIcon,
    contributions: 'Homepage Design & Styling, Workout Statistics, Meal Plan Statistics',
  },
  {
    name: 'Kevin Wu',
    github: 'https://github.com/kevin-wu01',
    linkedIn: 'https://www.linkedin.com/in/kevin-wu1/',
    profilePicture: KevinWuIcon,
    contributions: 'Chatbot, Schedule History, Signup Flows, OpenAI Integration',
  },
];

function TeamMemberCard({
  name, linkedIn, github, profilePicture, contributions,
}) {
  return (
    <Paper sx={styles.root}>

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

const features = [
  {
    name: 'API Authentication',
    description: 'JWT (JSON Web Token) keeps API endpoints protected, preventing malicious actors from stealing your data.',
    icon: HttpsIcon,
  },
  {
    name: 'Protected Database',
    description: 'A secure MongoDB cluster holds your data. Built in encryption and authentication ensures that your data is stored safely.',
    icon: StorageIcon,
  },
  {
    name: 'AI Schedules',
    description: 'Perfectly tailored meal and workout schedules made from OpenAI GPT models, adjusted exactly to your health profile',
    icon: CalendarMonthIcon,
  },
  {
    name: 'Voice Workouts',
    description: 'A virtual personal trainer at your service, with a information-rich control panel and efficient voice command options',
    icon: RecordVoiceOverIcon,
  },
  {
    name: 'Dashboard Statistics',
    description: 'Comprehensive macronutrients view with intuitive bar charts to provide insight into your weekly nutrient intake.',
    icon: QueryStatsIcon,
  },
  {
    name: 'Account System',
    description: 'Fully customizable user profiles that allow for profile image upload, and tight control over user statistics.',
    icon: PersonAddIcon,
  },
  {
    name: 'Google Integration',
    description: 'Integrated sign-in for a fast and secure login using your Google account.',
    icon: GoogleIcon,
  },
  {
    name: 'Accessible UI',
    description: 'WCAG standard contrast and  design with screen-reader support and responsive web layout.',
    icon: Diversity3Icon,
  },
];

function FeaturesCard({
  name, description, icon: Icon,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Paper sx={styles.featureCardPaper} onClick={togglePopup}>
      <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon sx={{ color: 'inherit', fontSize: '4rem', marginBottom: '0.25rem' }} />
      </Box>

      <Typography variant="h6" align="center" style={{ color: 'inherit', marginBottom: '10px' }}>
        {name}
      </Typography>

      <Dialog sx={{ '& .MuiDialog-paper': { backgroundColor: 'transparent' } }} open={isOpen} onClose={togglePopup} maxWidth="sm">
        <Paper sx={styles.popupContent}>
          <Typography variant="h3">{name}</Typography>
          <Icon sx={{ color: 'inherit', fontSize: '8rem' }} />
          <Typography variant="h4">{description}</Typography>
        </Paper>
      </Dialog>
    </Paper>
  );
}

export default function About() {
  return (
    <>
      <CssBaseline />
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
              paddingTop: '2.5%',
            }}
          >
            Features
          </Typography>

          <Box sx={{
            width: '50vw', flexWrap: 'wrap', paddingTop: '1%', paddingRight: '5%', paddingLeft: '5%', display: 'flex', gap: '2vw', justifyContent: 'center',
          }}
          >
            {features.map((feature) => (
              <FeaturesCard
                key={feature.name}
                name={feature.name}
                description={feature.description}
                icon={feature.icon}
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
              width: '75vw',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Margin />
            <Grid item sm={textSize} xs={12}>
              <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
                Introducing AIRON Fitness, your ultimate fitness companion,
                powered by cutting-edge artificial intelligence.
                Get ready to embark on a fitness journey like no other!
              </Typography>
            </Grid>
            <Margin /><Margin />
            <Grid item sm={textSize} xs={12}>
              <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
                AIRON Fitness is more than just a fitness app;
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
                AIRON Fitness has your back.
                Get ready to say goodbye to one-size-fits-all workouts
                and embrace a fitness solution that&apos;s tailor-made just for you.
              </Typography>
            </Grid>
            <Margin /><Margin />
            <Grid item sm={textSize} xs={12}>
              <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
                Creating your profile is just the beginning.
                Input your fitness goals, and let AIRON Fitness work its magic.
                You&apos;ll receive a comprehensive fitness plan,
                complete with guided workouts and a voice-controlled display
                to keep you on track and motivated.
                It&apos;s like having your very own fitness coach available 24/7!
              </Typography>
            </Grid>
            <Margin /><Margin />
            <Grid item sm={textSize} xs={12}>
              <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
                But that&apos;s not all,
                AIRON Fitness goes beyond the surface.
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
                With AIRON Fitness, you&apos;re in control.
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
            Accessibility
          </Typography>

          <Grid
            container
            spacing={2}
            sx={{ p: 2 }}
            style={{
              height: '100%',
              width: '75vw',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Margin />
            <Grid item sm={textSize} xs={12}>
              <Typography variant="h6" align="justify" gutterBottom sx={{ color: theme.palette.secondary.main }}>
                At AIRON Fitness, our goal is to create an app that is accessible and
                welcoming to all users, regardless of their abilities.
                We&apos;ve taken steps to ensure that our app is designed with accessibility
                in mind, and we&apos;re here to humbly share how we&apos;ve done so:
                <br />
                <br />
                1. Contrast Standards: <br />
                We&apos;ve put thought into the contrast of our app&apos;s elements,
                keeping acceptable contrast standards at the forefront.
                This way, text, icons, and visuals are distinguishable,
                offering a more readable experience for those with low vision or
                color vision impairments.
                <br />
                <br />
                2. Screen Reader Support: <br />
                AIRON Fitness is compatible with screen readers.
                Our approach involves crafting our app using semantic HTML and proper labeling.
                This way, screen reader users can seamlessly navigate, understand,
                and engage with all app features.
                <br />
                <br />
                3. Alternative Text for Images: <br />
                For images, we&apos;ve added descriptive alternative text (alt text).
                This helps screen reader users understand the content and context of images,
                from icons to graphics.
                <br />
                <br />
                4. Clear and Responsive Layout: <br />
                We&apos;ve taken care to keep our app&apos;s layout consistent and responsive.
                Users can effortlessly move through menus, buttons, and options
                using screen readers.
                <br />
                <br />
                5. Keyboard Navigation: <br />
                We&apos;ve made sure that AIRON Fitness supports keyboard navigation,
                providing an avenue for users who prefer keyboard commands or have motor
                disabilities to navigate without a mouse.
                <br />
                <br />
                6. User Personalization: <br />
                AIRON Fitness is about your journey.
                Our app empowers you to personalize your fitness plans
                according to your preferences and abilities.
                We understand that each journey is unique,
                and our aim is to make the app adaptable for all.
                <br />
                <br />
                7. Accessibility Support:<br />
                We&apos;re here to listen.
                If you encounter any accessibility challenges or
                have ideas for making our app even more inclusive,
                please reach out to our contacts that can be found on the About Page or create an issue on our <a id="github" href="https://github.com/jakji93/airon-fitness/issues" style={{ color: theme.palette.secondary.light, textDecoration: 'none' }}>Github Repository</a>.
                Creating an accessible app is an ongoing journey for us.
                We&apos;re grateful for your feedback and eager to make AIRON Fitness
                a place where everyone can thrive. Your fitness goals matter,
                and we&apos;re here to provide support that&apos;s as inclusive as it is empowering.
                <br />
                <br />
                8. Responsive Styling:<br />
                We want fitness to be convenient and easy for everyone. Use our app on any device,
                from your smartphone to a laptop.
                Stay fit at home or on the go,
                AIRON Fitness is your companion wherever and whenever.
              </Typography>
            </Grid>
            <Margin /><Margin />
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
              width: '75vw',
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
    </>
  );
}
