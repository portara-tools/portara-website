import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({ 
  palette: {  
    type: "dark",   
    primary: {
      main: "#ffffff"
    },
    background: {
      default: "#000"
    }
  }
})

export default theme;