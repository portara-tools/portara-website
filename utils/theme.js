import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#c744c5',
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
    // MuiButton: {
    //   outlined: {
    //     borderColor: "violet",
    //   }
    // }
  }
});

export default theme;