import { createTheme } from '@mui/material/styles';
import { grey, teal } from '@mui/material/colors';

const dark = createTheme({
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
    mode: 'dark',
    primary: {
      main: teal[600],
    },
    background: {
      paper: teal[600],
      default: grey[900],
    },
    text: {},
  },
});

export default dark;
