const { ApolloServer, gql } = require('apollo-server');
// import { typeDefs } from './api/schema';
// import { resolvers } from './api/resolvers';
// import {  } from './api/models';

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


const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req, res }) => ({ req, res }),
});

server.listen({ port: 4000 }, () => {
  console.log(`Server running @ PORT 4000`);
});