import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './utils/theme';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

let URI = 'https://portara-web.herokuapp.com/graphql';

if (process.env.NODE_ENV === 'development') {
  URI = 'http://localhost:4000/graphql';
}

const client = new ApolloClient({ uri: URI });

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
