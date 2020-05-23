
const { ApolloServer, PubSub, graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { gql } = require('apollo-server-express')
const express = require('express');
const path = require('path');
const http = require('http');
const pubsub = new PubSub();



const typeDefs = gql`
  type Query {
    portaraSettings(userID: String!, limit: ID!, per: ID!, throttle: ID!): Settings!
  }
  type Subscription {
    portaraSettings(userID: String!): Settings!
  }
  type Settings {
    userID: String!
    limit: ID!
    per: ID!
    throttle: ID!
  }
`;

const resolvers = {
  Subscription: {
    portaraSettings: {
      // also need args here to establish user ID as channel
      subscribe(_, { userID }) {
        console.log(userID)

        return pubsub.asyncIterator(userID)
      }
    }
  },
  Query: {
    portaraSettings: (_, { userID, limit, per, throttle }) => {
      pubsub.publish(userID, { portaraSettings: { userID, limit, per, throttle } })
      return { userID, limit, per, throttle }
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
