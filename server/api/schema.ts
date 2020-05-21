const { gql } = require('apollo-server');

// Construct a schema, using GraphQL schema language
export const typeDefs = gql`
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