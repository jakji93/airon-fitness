import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#112D4E',
      dark: '#000000',
      light: '#3F72AF',
    },
    secondary: {
      main: '#DBE2EF',
    },
    background: {
      default: '#F9F7F7',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'san-serif'].join(','),
    fontSize: 12,
    h1: {
      fontFamily: ['sans-serif', 'ariel'].join(','),
      fontWeight: 800,
      fontSize: 40,
    },
    h2: {
      fontFamily: ['sans-serif', 'ariel'].join(','),
      fontSize: 32,
    },
    h3: {
      fontFamily: ['sans-serif', 'ariel'].join(','),
      fontSize: 24,
    },
    h4: {
      fontFamily: ['sans-serif', 'ariel'].join(','),
      fontSize: 20,
    },
    h5: {
      fontFamily: ['sans-serif', 'ariel'].join(','),
      fontSize: 16,
    },
  },
  buttons: {
    hover: {
      backgroundColor: '#f0f0f0',
      transition: 'background-color 0.3s ease',
    },
  },
});

export default theme;
