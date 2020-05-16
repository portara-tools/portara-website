import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'black',
    },
    text: {
      primary: "#fff"
    },
    action: {
      hoverOpacity: 0.2
    }
  },
  // OVERRIDES
  overrides: {
    MuiButton: {
      outlined: {
        borderColor: "violet",
        borderOpacity: 0
      }
    }
  }
});

export default theme;