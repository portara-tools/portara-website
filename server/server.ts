
const { ApolloServer, PubSub, graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { gql } = require('apollo-server-express')
const express = require('express');
const path = require('path');
const http = require('http');
const pubsub = new PubSub();


const typeDefs = gql`
  type Query {
    test: String
  }
  type Subscription {
    testSub: String!
  }
`;

const resolvers = {
  Subscription: {
    testSub: {
      subscribe() {
        return pubsub.asyncIterator("TEST_SUB")
      }
    }
  },
  Query: {
    test: () => {
      pubsub.publish('TEST_SUB', { testSub: 'sub returned' })
      return 'Testing is a Success!'
    },

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

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);


server.applyMiddleware({
  app,
});

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
