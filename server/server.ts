
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
    limit: ID!
    per: ID!
    throttle: ID!
  }
`;

const settings = { limit: 5, per: 20, throttle: 1 }

const resolvers = {
  Subscription: {
    portaraSettings: {
      // also need args here to establish user ID as channel
      subscribe() {
        return pubsub.asyncIterator("PORTARA_SETTINGS")
      }
    }
  },
  Query: {
    portaraSettings: () => { // we need to use args here to grab correct user ID and also insert into limit etc
      pubsub.publish('PORTARA_SETTINGS', { portaraSettings: { limit: settings.limit, per: settings.per, throttle: settings.throttle } })
      return settings
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
