export {} 

const { ApolloServer } = require('apollo-server-lambda');
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req, res }) => ({ req, res }),
  playground: {
    endpoint: "/dev/graphql",
  },
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
  endpointURL: '/graphql',
});