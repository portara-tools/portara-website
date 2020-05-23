
const { ApolloServer, PubSub, graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { gql } = require('apollo-server-express')
const express = require('express');
const path = require('path');
const http = require('http');
const pubsub = new PubSub();


const typeDefs = gql`
  type Query {
    portaraSettings: Settings!
  }
  type Subscription {
    portaraSettings: Settings!
  }
  type Settings {
    limit: Int!
    per: ID!
    throttle: ID!
  }
`;

const resolvers = {
  Subscription: {
    portaraSettings: {
      subscribe() {
        return pubsub.asyncIterator("PORTARA_SETTINGS")
      }
    }
  },
  Query: {
    portaraSettings: () => {
      pubsub.publish('PORTARA_SETTINGS', { portaraSettings: { limit: 5, per: 20, throttle: 1 } })
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
