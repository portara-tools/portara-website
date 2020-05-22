// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server-express'
const express = require('express');
const path = require('path');

const typeDefs = gql`
  type Query {
    test: String
    getAllRateLimiters: [RateLimiter!]
  }

  type Mutation {
    addUser(username: String!): User!
    deleteUser(username: String!): User!

    addRateLimiter(
      userId: ID!, 
      projectName: ID!,
      limit: Int!,
      per: ID!,
      throttle: ID
    ): RateLimiter

    deleteRateLimiter(
      userId: ID!, 
      id: ID!,
    ): RateLimiter

    editRateLimiter(
      userId: ID!, 
      id: ID!,
    ): RateLimiter
  }

  type User {
    id: ID!
    username: String!
    rateLimiter: [RateLimiter]
  }

  type RateLimiter {
    userId: ID!
    projectName: ID!
    limit: Int!
    per: ID!
    throttle: ID
    id: ID!
  }
`;

const resolvers = {
  Query: {
    test: () => 'Testing is a Success!',
    // getAllRateLimiters:
  },
};

const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))  
})

server.applyMiddleware({
  app,
});

app.listen({port: PORT || 4000}, () => {
  console.log(`Listening @ ${PORT}`)
})