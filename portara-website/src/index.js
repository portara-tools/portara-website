import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import aws_config from './aws-exports';
import { ApolloProvider } from 'react-apollo'

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
      <App />
  </ApolloProvider>, 

document.getElementById('root'));