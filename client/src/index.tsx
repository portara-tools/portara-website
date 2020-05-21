import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './utils/theme';
import App from './App';

// const theme = createMuiTheme({ palette: { type: 'dark' } });

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* <React.StrictMode> */}
    <CssBaseline>
      <App />
    </CssBaseline>
    {/* </React.StrictMode> */}
  </ThemeProvider>,
  document.getElementById('root')
);
