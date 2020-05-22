import React from 'react';
import ReactDOM from 'react-dom';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import aws_config from './aws-exports';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import theme from './utils/theme';
import App from './App';

const client = new AWSAppSyncClient({
    url: aws_config.aws_appsync_graphqlEndpoint,
    region: aws_config.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: aws_config.aws_appsync_apiKey,
    }
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </ThemeProvider>
  </ApolloProvider>, 

document.getElementById('root'));