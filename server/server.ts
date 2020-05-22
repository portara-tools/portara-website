
const { ApolloServer, PubSub } = require('apollo-server-express')
const { gql } = require('apollo-server-express')
const express = require('express');
const path = require('path');
// import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

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

  type Comment {
  id: String
  content: String
  }

  type Subscription {
    test: String!
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }

`;

const resolvers = {
  Query: {
    test: () => {
      pubsub.publish('test', { test: 'sub returned' })
      return 'Testing is a Success!'
    },
    // getAllRateLimiters:
  },
  Subscription: {
    test: {
      subscribe: () => pubsub.asyncIterator('test')
    }
  },

};

const PORT = process.env.PORT || 4000;

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, pubsub }),
  playground: true,
});

// may have to set up route for graphql
// app.use('/graphql', )


server.applyMiddleware({
  app,
});

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen({ port: PORT || 4000 }, () => {
  console.log(`Listening @ ${PORT}`)
})