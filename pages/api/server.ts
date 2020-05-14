
const { gql } = require('apollo-server-lambda');
// const { ApolloServer } = require('apollo-server-lambda');
// const {typeDefs} = require('./graphql/typeDefs');
// const {resolvers} = require('./graphql/resolvers');
// import { resolvers } from './graphql/resolvers';

// const server = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  //   // context: ({ req, res }) => ({ req, res }),
  //   playground: {
    //     endpoint: "/dev/graphql",
    //   },
    // });
    
    
    // exports.graphqlHandler = server.createHandler({
      //   cors: {
        //     origin: '*',
        //     credentials: true,
        //   },
        //   endpointURL: '/graphql',
        // });
        
        
        
// !UNCOMMENT TO USE LOCAL SERVER FOR TESTING. If switching to AWS, remember to change the URI string at the bottom in the "lib/withApollo" file
        
const { ApolloServer } = require('apollo-server');
const typeDefs = gql`
  type Query {
    hello: String
  },
`;

const resolvers = {
  Query: {
    hello: () => 'hello'
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: any) => {
  console.log(`listening @ ${url}`);
});