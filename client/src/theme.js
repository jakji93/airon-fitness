import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#112D4E',
      dark: '#000000',
      light: '#3F72AF',
    },
    secondary: {
      main: '#B5936B',
      dark: '#3F3F47',
      light: '#ffffff',
    },
    background: {
      default: '#3F3F47',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'san-serif'].join(','),
    fontSize: 12,
    h1: {
      fontFamily: ['Montserrat', 'san-serif'].join(','),
      fontWeight: 800,
      fontSize: 40,
    },
    h2: {
      fontFamily: ['Montserrat', 'san-serif'].join(','),
      fontSize: 32,
    },
    h3: {
      fontFamily: ['Montserrat', 'san-serif'].join(','),
      fontSize: 24,
    },
    h4: {
      fontFamily: ['Montserrat', 'san-serif'].join(','),
      fontSize: 20,
    },
    h5: {
      fontFamily: ['Montserrat', 'san-serif'].join(','),
      fontSize: 16,
    },
  },
  buttons: {
    hover: {
      backgroundColor: '#f0f0f0',
      transition: 'background-color 0.3s ease',
    },
  },
  // change the textfield border radius throughout the entire app to be slightly rounded
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
        },
      },
    },
  },
});

export default theme;
