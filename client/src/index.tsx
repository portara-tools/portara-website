import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './utils/theme';
import App from './App';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

// const theme = createMuiTheme({ palette: { type: 'dark' } });
// const client = new ApolloClient({ uri: "http://localhost:4000/graphql" })
const client = new ApolloClient({ uri: "http://portara-web.herokuapp.com/graphql" })


ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      {/* <React.StrictMode> */}
      <CssBaseline>
        <App />
      </CssBaseline>
      {/* </React.StrictMode> */}
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
