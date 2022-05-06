import { createTheme } from '@mui/material/styles';
import { teal } from '@mui/material/colors';

const light = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '.5rem 0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '.5rem 0',
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: teal[800],
    },
    background: {
      paper: teal[800],
    },
    text: {
      primary: '#000',
      secondary: '#000',
    },
  },
});

export default light;
