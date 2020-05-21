const { gql } = require('apollo-server-lambda');

export const typeDefs = gql`
  type Query {
    hello: String
  }

  type User {
    id: ID!
    name: String!
  }

  type Mutation {
    createUser(name: String!): User!
  }
`;

